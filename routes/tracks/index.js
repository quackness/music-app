const express = require('express');
const Database = require('better-sqlite3');
const multer = require('multer');
const path = require('path');
const db = Database(process.cwd() + '/database/chinook.sqlite');
const Joi = require('joi');
const router = express.Router();


const tracksSchema = Joi.object({
  Name: Joi.string().max(50).required(),
  MediaTypeId: Joi.number().integer().max(5).required(),
  AlbumId: Joi.number().integer(),
  Milliseconds: Joi.number().integer().required()//q: it is required but in patch it updates it with a blank value and sets to 0:00
});



router.get('/:id', (req, res) => {
  const query = db.prepare('select * from tracks where TrackId=?');
  const data = query.all(req.params.id);
  res.json(data);
})

router.delete('/:id', (req, res) => {
  const deleteTrackSql = db.prepare('DELETE FROM tracks WHERE TrackId = ?');
  const result = deleteTrackSql.run(req.params.id);
  if (result.changes > 0) {
    res.json(result);
  } else {
    res.status(404).json(result);
  }
})


router.post('/', express.json(), (req, res) => {
  console.log(req.body);
  const { error } = tracksSchema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(422).send(error.details);
  }
  console.log(req.body)
  const columnName = [];
  const values = [];
  const parameters = [];
  for (key in req.body) {
    parameters.push('?');
    columnName.push(key)
    values.push(req.body[key])
  }
  console.log(columnName, values);
  //question: if I use values it complains about column name but itsthe value
  const addTrackSql = `INSERT INTO tracks (${columnName.join(', ')}) VALUES (${parameters.join(', ')});`
  console.log(addTrackSql);
  const addTrack = db.prepare(addTrackSql);
  const result = addTrack.run(values);
  res.status(201).json(result);
  //q: with res.status(200).json(result); it does not show a pop up as well as with the code below
  //result.changes > 0 ? res.json(result) : res.status(404).json(result);
  // res.status(200).json(result);
  // res.json(result);
})


router.patch('/:id', (req, res) => {
  console.log(req.body);
  const { error } = tracksSchema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(422).send(error.details);
  }
  const columnName = [];
  const values = [];
  for (key in req.body) {
    columnName.push(`${key} = ?`)
    values.push(req.body[key]);
  }
  values.push(req.params.id);
  console.log(columnName, values)
  const updateTrackSql = `UPDATE tracks SET ${columnName.join(', ')} where TrackId = ?`;
  const updateTrack = db.prepare(updateTrackSql);
  const result = updateTrack.run(values);
  result.changes > 0 ? res.json(result) : res.status(404).json(result);
});




module.exports = router;

