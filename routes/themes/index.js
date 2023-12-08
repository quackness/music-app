const express = require('express');
const Database = require('better-sqlite3');
const router = express.Router();
const db = Database(process.cwd() + '/database/chinook.sqlite');

router.get('/', (req, res) => {
  const getThemes = db.prepare('SELECT * from themes');
  const themes = getThemes.all();
  res.json(themes);
});

module.exports = router;