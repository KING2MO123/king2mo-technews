# Déploiement Railway

1. Va sur https://railway.app → "New Project" → "Deploy from GitHub"
2. Sélectionne `king2mo-technews` → dossier `backend`
3. Railway détecte Node.js automatiquement
4. Variables d'environnement : aucune requise
5. Une fois déployé, copie l'URL (ex: `https://king2mo-technews.up.railway.app`)
6. Dans `index.html`, change : `const API = null` → `const API = 'https://TON-URL.railway.app'`

# Développement local

```bash
cd backend
npm install
npm run dev
# API disponible sur http://localhost:3000
```

# Endpoints API

| Méthode | Route | Description |
|---------|-------|-------------|
| GET | /api/articles | Liste des articles (filtre: tag, q, page, limit) |
| GET | /api/hero | Article à la une |
| GET | /api/trends | Top 5 Hacker News |
| GET | /api/stats | Stats par source |
| POST | /api/newsletter | Inscription (body: {email}) |
| GET | /api/refresh | Force le refresh manuel |
