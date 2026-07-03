# ⚡ KING2MO TECHNEWS

> Agrégateur d'actualités tech en temps réel — 100 % frontend

[![Live](https://img.shields.io/badge/Live-GitHub%20Pages-6366f1?style=flat-square&logo=github)](https://king2mo123.github.io/king2mo-technews/)
![HTML](https://img.shields.io/badge/HTML5-100%25-orange?style=flat-square&logo=html5)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-CDN-38bdf8?style=flat-square&logo=tailwindcss)
![No Backend](https://img.shields.io/badge/Backend-Aucun-green?style=flat-square)

## 🚀 Features

- 📰 **RSS en direct** — Numerama & The Verge via proxy CORS
- 🔥 **Hacker News Top** — via API Algolia (sans proxy)
- 🌙 **Dark / Light mode** avec persistance localStorage
- 🔍 **Recherche en temps réel** sur tous les articles
- 🏷️ **Filtres par source** — FR / Tech / HN
- ♾️ **Charger plus** — pagination côté client
- 📊 **Stats sources** — répartition visuelle
- 💌 **Newsletter** — formulaire (frontend only)
- 🔔 **Toast notifications**
- 📱 **Responsive** — mobile first
- ⚡ **Refresh auto** toutes les 10 minutes

## 🛠️ Stack

| Couche | Technologie |
|--------|-------------|
| Structure | HTML5 sémantique |
| Style | TailwindCSS CDN + CSS custom |
| Icônes | Lucide Icons |
| Typo | Inter + Playfair Display (Google Fonts) |
| Data | RSS via allorigins.win · HN via Algolia API |
| Hébergement | GitHub Pages |

## 📂 Structure

```
king2mo-technews/
├── index.html      # App complète (single file)
└── README.md
```

## ⚙️ Lancer localement

Aucune installation requise — ouvre simplement `index.html` dans ton navigateur.

```bash
# Ou avec un serveur local :
npx serve .
```

## 🌐 Sources de données

| Source | Type | Proxy |
|--------|------|-------|
| [Numerama](https://www.numerama.com) | RSS | allorigins.win |
| [The Verge](https://www.theverge.com) | RSS | allorigins.win |
| [Hacker News](https://news.ycombinator.com) | Algolia API | Aucun |

## 📄 Licence

MIT © 2026 [king2mo123](https://github.com/king2mo123)
