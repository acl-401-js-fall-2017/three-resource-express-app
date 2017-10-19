const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const errorHandler = require('./utils/error-handler');

app.use(morgan('dev'));
app.use(express.static('./public'));
app.use(bodyParser.json());


// const pokemons = require('./routes/pokemons');
// app.use('/api/pokemons', pokemons);






app.use(errorHandler());

module.exports = app;