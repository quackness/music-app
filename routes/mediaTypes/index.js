const express = require('express');
const Database = require('better-sqlite3');
const router = express.Router();
const db = Database(process.cwd() + '/database/chinook.sqlite');


router.get('/', (req, res) => {
  const mediaTypes = db.prepare('SELECT * FROM media_types;');
  const result = mediaTypes.all()
  res.json(result);
});

module.exports = router;