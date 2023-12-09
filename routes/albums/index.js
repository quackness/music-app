const express = require('express');
const Database = require('better-sqlite3');
const multer = require('multer');
const path = require('path');
const db = Database(process.cwd() + '/database/chinook.sqlite');
const Joi = require('joi');
const router = express.Router();

const albumsSchema = Joi.object({
  Title: Joi.string().max(50).required(),
  ReleaseYear: Joi.number().integer().min(1900).max(new Date().getFullYear()).required(),
  ArtistId: Joi.number().integer()
});

router.get('/:id/tracks', (req, res) => {
  const query = db.prepare('select * from tracks where AlbumId=?');
  const data = query.all(req.params.id);
  res.json(data);
});

router.delete('/:id', (req, res) => {
  const deletAlbumSql = 'DELETE from albums Where AlbumId = ?';
  const deleteAlbum = db.prepare(deletAlbumSql);
  const result = deleteAlbum.run([req.params.id]);
  console.log(result)
  if (result.changes > 0) {
    res.json(result);
  } else {
    res.status(404).json(result);
  }
});


router.post('/', (req, res) => {
  const { error } = albumsSchema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(422).send(error.details);
  }
  console.log(req.body);
  const columnName = [];
  const values = [];
  const parametersSanitized = [];
  for (key in req.body) {
    columnName.push(key);
    parametersSanitized.push('?');
    values.push(req.body[key]);
  }
  console.log(columnName, parametersSanitized, values);
  const addAlbumSql = `INSERT INTO Albums (${columnName.join(',')}) VALUES (${parametersSanitized.join(',')});`
  const addAlbum = db.prepare(addAlbumSql);
  const result = addAlbum.run(values);
  res.status(201).json(result);
});

router.patch('/:id', (req, res) => {
  const { error } = albumsSchema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(422).send(error.details);
  }
  console.log(req.body);
  const columnName = [];
  const values = [];
  for (key in req.body) {
    columnName.push(`${key} =?`);
    values.push(req.body[key])
  }
  values.push(req.params.id);
  console.log(columnName, values, req.params.id)
  const editAlbumSQL = `UPDATE albums SET ${columnName.join(', ')} WHERE AlbumId =?`;
  console.log(editAlbumSQL);
  const editAlbum = db.prepare(editAlbumSQL);
  const result = editAlbum.run(values);
  res.json(result);
});

router.get('/:id', (req, res) => {
  const artists = db.prepare('SELECT * FROM albums where AlbumId = ?');
  const data = artists.get(req.params.id);
  res.json(data);
});


const storage = multer.diskStorage({
  //destination: './_FrontendStarterFiles/albumart',//process.cwd() +? 
  destination: process.cwd() + '/_FrontendStarterFiles/albumart',//process.cwd() +? 
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





module.exports = router;

