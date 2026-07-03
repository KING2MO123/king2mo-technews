const CACHE_NAME = 'k2m-technews-v2';
const ASSETS = [
  '/king2mo-technews/',
  '/king2mo-technews/index.html',
  '/king2mo-technews/manifest.json',
  '/king2mo-technews/icon.svg'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(ASSETS)));
});

self.addEventListener('fetch', e => {
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});
