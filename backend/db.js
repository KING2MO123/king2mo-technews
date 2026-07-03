const low  = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('./technews.json');
const db = low(adapter);

// Valeurs par défaut
db.defaults({ articles: [], newsletter: [], trends: [] }).write();

module.exports = db;
