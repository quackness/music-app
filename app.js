const express = require('express');
const Database = require('better-sqlite3');
const multer = require('multer');
const path = require('path');
const db = new Database('./Database/chinook.sqlite');

const app = express();
//serve static files 
app.use(express.static('_FrontendStarterFiles'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/api/artists', (req, res) => {
  const artists = db.prepare('SELECT * FROM artists');
  const data = artists.all();
  // console.log("data /api/artists", data)
  res.json(data);
});


app.get('/api/artists/:id/albums', (req, res) => {
  const database = db.prepare('select * from albums where ArtistId = ?');
  const data = database.all(req.params.id);
  // console.log('/api/artists/:id/albums', data)
  if (data !== undefined) {
    res.json(data)
  } else {
    res.status(404).send("Artist not found");
  }
})


//Create a new endpoint that allows the frontend to 
//request tracks based on a selected album.
//server listening on 3000 for any get request on this end point 
app.get('/api/albums/:id/tracks', (req, res) => {
  const query = db.prepare('select * from tracks where AlbumId=?');
  const data = query.all(req.params.id);
  //server sends a response to the client as json format
  res.json(data);
});

//create endpoint to support file upload
//configuration of multer https://expressjs.com/en/resources/middleware/multer.html
const storage = multer.diskStorage({
  destination: './_FrontendStarterFiles/albumart',
  filename: function (req, file, callback) {
    callback(null, Date.now().toString() + path.extname(file.originalname))
  }
})
const upload = multer({ storage: storage })
app.post('/api/albums/:id/albumart', upload.single('albumart'), (req, res) => {
  console.log(req.file); // Output the entire req object for inspection
  const query = db.prepare('UPDATE albums SET AlbumArt = ? WHERE AlbumId = ?');
  const result = query.run([req.file.filename, req.params.id]);
  // console.log("result", result)
  res.json(result);
});


//Create Express.js endpoints to handle the creation, updating, and deletion of artists. 
//Use the frontend files as a guide for endpoint requirements.

//delete an artist
app.delete('/api/artists/:id', (req, res) => {
  const deleteArtistSql = `DELETE FROM artists WHERE ArtistId = ?;`;
  const deleteArtist = db.prepare(deleteArtistSql);
  console.log(deleteArtist);
  //run
  const deleteResult = deleteArtist.run([req.params.id]);
  // res.json(deleteResult);
  // console.log(res.json(deleteResult));
  if (deleteResult > 0) {
    res.json(deleteResult);
  } else {
    res.status(404).json(deleteResult);
  }
});

//add artist

app.post('/api/artists', express.json(), (req, res) => {
  console.log(req.body);//{ Name: 'test' }
  const columns = [];
  const parameters = [];
  const values = [];
  for (key in req.body) {
    parameters.push('?');
    columns.push(key);
    values.push(req.body[key]);
  };
  console.log(columns, values, parameters);
  const sql = `INSERT INTO Artists (${columns.join(', ')}) VALUES (${parameters.join(', ')});`
  console.log(sql);
  const statement = db.prepare(sql);
  const result = statement.run(values);
  res.status(201).json(result);





});


app.listen(3000, () => { "Listening on port 3000" });