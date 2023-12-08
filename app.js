const express = require('express');
const Database = require('better-sqlite3');
const multer = require('multer');
const path = require('path');
const db = new Database('./Database/chinook.sqlite');
const Joi = require('joi');

//import routes 
const themesRouter = require('./routes/themes');//will look for index.js by def
const artistsRouter = require('./routes/artists');
const albumsRouter = require('./routes/albums');
const tracksRouter = require('./routes/tracks');
const mediaTypes = require('./routes/mediaTypes');

const app = express();
//serve static files 
app.use(express.static('_FrontendStarterFiles'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//inject route
app.use('/api/themes', themesRouter);
app.use('/api/artists', artistsRouter);
app.use('/api/albums', albumsRouter);
app.use('/api/tracks', tracksRouter);
app.use('/api/mediaTypes', mediaTypes);


/*
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
app.post('api/albums/:id/albumart', upload.single('albumart'), (req, res) => {
  console.log(req.file); // Output the entire req object for inspection
  const query = db.prepare('UPDATE albums SET AlbumArt = ? WHERE AlbumId = ?');
  const result = query.run([req.file.filename, req.params.id]);
  res.json(result);
});
*/


app.listen(3000, () => { "Listening on port 3000" });


//the front end statuses vs end point 200, 201 etc
