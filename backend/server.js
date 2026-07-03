const express = require('express');
const cors    = require('cors');
const cron    = require('node-cron');
const Parser  = require('rss-parser');
const fetch   = require('node-fetch');
const db      = require('./db');

const app    = express();
const parser = new Parser({ timeout: 8000 });
const PORT   = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('../'));

const RSS_SOURCES = [
  { name: 'Numerama',  url: 'https://www.numerama.com/feed/',         tag: 'FR'   },
  { name: 'The Verge', url: 'https://www.theverge.com/rss/index.xml', tag: 'Tech' },
];

const stripHtml = s => s ? s.replace(/<[^>]+>/g,'').trim() : '';

function extractImg(item) {
  if (item['media:content']?.['$']?.url) return item['media:content']['$'].url;
  if (item.enclosure?.url)               return item.enclosure.url;
  const m = (item['content:encoded'] || item.content || item.summary || '').match(/<img[^>]+src=["']([^"']+)/i);
  return m ? m[1] : '';
}

async function fetchRss(src) {
  const feed = await parser.parseURL(src.url);
  let count  = 0;
  for (const item of feed.items.slice(0, 15)) {
    const url = (item.link || '').trim();
    if (!url) continue;
    const exists = db.get('articles').find({ url }).value();
    if (!exists) {
      db.get('articles').push({
        id:       Date.now() + Math.random(),
        title:    stripHtml(item.title || ''),
        summary:  stripHtml(item.contentSnippet || item.summary || '').slice(0, 350),
        url,
        img:      extractImg(item),
        source:   src.name,
        tag:      src.tag,
        pub_date: item.pubDate || item.isoDate || new Date().toISOString(),
      }).write();
      count++;
    }
  }
  return count;
}

async function fetchHN() {
  const res  = await fetch('https://hn.algolia.com/api/v1/search?tags=front_page&hitsPerPage=15');
  const data = await res.json();
  db.set('trends', data.hits.map(h => ({
    title:    h.title,
    url:      h.url || `https://news.ycombinator.com/item?id=${h.objectID}`,
    points:   h.points,
    comments: h.num_comments,
  }))).write();
  return data.hits.length;
}

async function refresh() {
  console.log('[refresh]', new Date().toISOString());
  // Garde seulement les 200 derniers articles
  const arts = db.get('articles').sortBy('pub_date').reverse().take(200).value();
  db.set('articles', arts).write();
  const results = await Promise.allSettled([fetchHN(), ...RSS_SOURCES.map(fetchRss)]);
  results.forEach((r, i) => {
    const label = i === 0 ? 'HN' : RSS_SOURCES[i-1].name;
    if (r.status === 'rejected') console.error('[error]', label, r.reason.message);
    else console.log('[ok]', label, '+' + r.value);
  });
}

// ── ROUTES ────────────────────────────────────────────────

app.get('/api/articles', (req, res) => {
  const { tag, q, page = 1, limit = 6 } = req.query;
  const offset = (parseInt(page) - 1) * parseInt(limit);
  let chain = db.get('articles').sortBy('pub_date').reverse();
  if (tag && tag !== 'all') chain = chain.filter({ tag });
  if (q) chain = chain.filter(a => a.title.toLowerCase().includes(q.toLowerCase()) || a.source.toLowerCase().includes(q.toLowerCase()));
  const all      = chain.value();
  const articles = all.slice(offset, offset + parseInt(limit));
  res.json({ total: all.length, page: parseInt(page), articles });
});

app.get('/api/hero', (req, res) => {
  const hero = db.get('articles').filter(a => a.img).sortBy('pub_date').reverse().first().value()
            || db.get('articles').sortBy('pub_date').reverse().first().value();
  res.json(hero || null);
});

app.get('/api/trends', (req, res) => {
  res.json(db.get('trends').sortBy('points').reverse().take(5).value());
});

app.post('/api/newsletter', (req, res) => {
  const { email } = req.body;
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return res.status(400).json({ error: 'Email invalide' });
  const exists = db.get('newsletter').find({ email }).value();
  if (exists) return res.status(409).json({ error: 'Email déjà inscrit' });
  db.get('newsletter').push({ email, created_at: new Date().toISOString() }).write();
  res.json({ success: true });
});

app.get('/api/stats', (req, res) => {
  const articles = db.get('articles').value();
  const counts   = {};
  articles.forEach(a => { counts[a.source] = (counts[a.source]||0)+1; });
  res.json({
    total_articles:        articles.length,
    newsletter_subscribers: db.get('newsletter').size().value(),
    sources: Object.entries(counts).map(([source, count]) => ({ source, count })),
  });
});

app.get('/api/refresh', async (req, res) => {
  await refresh();
  res.json({ ok: true, timestamp: new Date().toISOString() });
});

cron.schedule('*/10 * * * *', refresh);

app.listen(PORT, async () => {
  console.log(`🚀 API on http://localhost:${PORT}`);
  await refresh();
});
