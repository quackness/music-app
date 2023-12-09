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


app.listen(3000, () => { "Listening on port 3000" });


//the front end statuses vs end point 200, 201 etc
