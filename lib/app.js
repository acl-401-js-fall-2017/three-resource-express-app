const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

const actors = require('./routes/actors');
app.use('/api/actors', actors);

const movies = require('./routes/movies');
app.use('/api/movies',movies);

const studios = require('./routes/studios');
app.use('/api/studios', studios);


module.exports = app;