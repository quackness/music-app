const express = require('express');
const Database = require('better-sqlite3');
const multer = require('multer');
const path = require('path');
const db = Database(process.cwd() + '/database/chinook.sqlite');
const Joi = require('joi');
const router = express.Router();

const artistsSchema = Joi.object({
  Name: Joi.string().max(50).required(),
});


router.get('/', (req, res) => {
  const artists = db.prepare('SELECT * FROM artists');
  const data = artists.all();
  res.json(data);
});

router.get('/:id', (req, res) => {
  const artists = db.prepare('SELECT * FROM artists where ArtistId = ?');
  const data = artists.get(req.params.id);
  res.json(data);
});


router.get('/:id/albums', (req, res) => {
  const database = db.prepare('select * from albums where ArtistId = ?');
  const data = database.all(req.params.id);
  if (data !== undefined) {
    res.json(data)
  } else {
    res.status(404).send("Artist not found");
  }
})

// //create endpoint to support file upload
// //configuration of multer https://expressjs.com/en/resources/middleware/multer.html
const storage = multer.diskStorage({
  destination: './_FrontendStarterFiles/albumart',//process.cwd() +? 
  //destination: process.cwd() + '/_FrontendStarterFiles/albumart',//process.cwd() +? 
  filename: function (req, file, callback) {
    callback(null, Date.now().toString() + path.extname(file.originalname))
  }
})
const upload = multer({ storage: storage })
router.post('/:id/albumart', upload.single('albumart'), (req, res) => {
  console.log(req.file); // Output the entire req object for inspection
  const query = db.prepare('UPDATE albums SET AlbumArt = ? WHERE AlbumId = ?');
  const result = query.run([req.file.filename, req.params.id]);
  res.json(result);
});


// //delete an artist
router.delete('/:id', (req, res) => {
  const deleteArtistSql = `DELETE FROM artists WHERE ArtistId = ?;`;
  const deleteArtist = db.prepare(deleteArtistSql);
  const deleteResult = deleteArtist.run([req.params.id]);
  if (deleteResult.changes > 0) {
    res.json(deleteResult);
  } else {
    res.status(404).json(deleteResult);
  }
});

//add artist
router.post('/', express.json(), (req, res) => {
  const { error } = artistsSchema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(422).send(error.details);
  }
  //.log(req.body);//{ Name: 'test' }
  const columns = [];
  const parameters = [];
  const values = [];
  for (key in req.body) {
    parameters.push('?');
    columns.push(key);
    values.push(req.body[key]);
  };
  //console.log(columns, values, parameters);
  const sql = `INSERT INTO Artists (${columns.join(', ')}) VALUES (${parameters.join(', ')});`
  //console.log(sql);
  //console.log("test");
  const statement = db.prepare(sql);
  //console.log("test");
  const result = statement.run(values);
  //console.log("test");
  res.status(201).json(result);
});


// //edit artist
router.patch('/:id', (req, res) => {
  //console.log(req.body);
  const { error } = artistsSchema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(422).send(error.details);
  }

  const columns = [];
  const values = [];
  //console.log(req.body);//{ Name: '
  for (key in req.body) {
    columns.push(`${key}=?`);//[ 'Name=?' ] 
    values.push(req.body[key]);
  }
  values.push(req.params.id)
  //console.log(values);//[ 'new', '283' ]
  const sqlUpdateArtist = `UPDATE artists SET ${columns.join(',')} where ArtistId=?`;
  const statement = db.prepare(sqlUpdateArtist);
  const result = statement.run(values);
  res.status(200).json(result);
});

module.exports = router;