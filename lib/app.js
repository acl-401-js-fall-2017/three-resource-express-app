const express = require('express');
const app = express();
const bodyParser = require('body-parser');
// const errorHandler = require('./utils/error-handler');
const morgan = require('morgan');

app.use(morgan('dev'));
app.use(express.static('./public'));
app.use(bodyParser.json());

// const movies = require('./routes/movies');
const actors = require('./routes/actors');
// const studios = require('./routes/studios');

// app.use('/api/entertainment/movies', movies);
app.use('/api/entertainment/actors', actors);
// app.use('/api/entertainment/studios', studios);



// app.use(errorHandler());

module.exports = app;