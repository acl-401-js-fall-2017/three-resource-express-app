
const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const morgan = require('morgan');
const errorHandler = require('./utils/error-handler')();

app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(express.static('public'));

const actors = require('./routes/actors');
app.use('/api/actors', actors);

const movies = require('./routes/movies');
app.use('/api/movies', movies);

app.use(errorHandler);


module.exports = app;