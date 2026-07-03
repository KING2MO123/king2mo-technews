# ⚡ KING2MO TECHNEWS

> Agrégateur d'actualités tech en temps réel — Frontend (GitHub Pages) + Backend API (Railway)

[![Live](https://img.shields.io/badge/Live-GitHub%20Pages-6366f1?style=flat-square&logo=github)](https://king2mo123.github.io/king2mo-technews/)
![HTML](https://img.shields.io/badge/HTML5-Frontend-orange?style=flat-square&logo=html5)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-CDN-38bdf8?style=flat-square&logo=tailwindcss)
![Node.js](https://img.shields.io/badge/Node.js-Backend-339933?style=flat-square&logo=node.js)
![Railway](https://img.shields.io/badge/Railway-Hosted-0B0D0E?style=flat-square&logo=railway)

## 🚀 Features

- 📰 **Flux Automatisé** — Le backend récupère l'actu toutes les 10 minutes.
- 🔥 **Sources variées** — Numerama (FR), The Verge (Tech), JeuxVideo.com (Gaming), Afrique IT News (Afrique).
- ⚡ **Hacker News Top** — Récupération des tendances via l'API Algolia.
- 💾 **Stockage JSON** — Base de données ultra-rapide sans compilation via `lowdb`.
- 🌙 **Dark / Light mode** avec persistance `localStorage`.
- 🔍 **Recherche et filtres** en temps réel sur les articles mis en cache.
- 📊 **Dashboard Stats** — Répartition visuelle des sources d'actualités.
- 💌 **Newsletter** — Sauvegarde des emails dans la base de données du backend.

## 🛠️ Stack Technique

| Couche | Technologie | Hébergement |
|--------|-------------|-------------|
| **Frontend** | HTML5, TailwindCSS (CDN), Vanilla JS | GitHub Pages |
| **Backend** | Node.js, Express, `node-cron` | Railway |
| **Base de données**| `lowdb` (JSON statique local) | Railway (Volume) |

## 📂 Structure du projet

```
king2mo-technews/
├── index.html              # Frontend UI
├── README.md               # Documentation globale
└── backend/
    ├── server.js           # API REST et cron jobs
    ├── db.js               # Configuration lowdb
    ├── package.json        # Dépendances Node.js
    └── DEPLOY.md           # Instructions de déploiement backend
```

## ⚙️ Lancer localement

### 1. Démarrer le Backend
```bash
cd backend
npm install
npm run dev
# L'API tourne sur http://localhost:3000
```

### 2. Démarrer le Frontend
Ouvre simplement le fichier `index.html` dans ton navigateur, ou utilise un serveur local :
```bash
npx serve .
```
*(N'oublie pas de changer `const API = 'http://localhost:3000'` dans `index.html` pour pointer vers ton backend local).*

## 📄 Licence

MIT © 2026 [king2mo123](https://github.com/king2mo123)
