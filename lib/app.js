const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const errorHandler = require('./utils/error-handler');
const morgan = require('morgan');


app.use(morgan('dev'));
app.use(bodyParser.json());
const sitcoms = require('./routes/sitcoms');
const cartoons = require('./routes/cartoons');
app.use('/api/sitcoms', sitcoms);
app.use('/api/cartoons', cartoons);

app.use(errorHandler());

module.exports = app; 