const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const errorHandler = require('./util/error-handler');

const morgan = require('morgan');

app.use(morgan('tiny'));
app.use(express.static('./public'));
app.use(bodyParser.json());

const dogs = require('./route/dogs');
app.use('/api/dogs', dogs);

app.use(errorHandler());

module.exports = app;