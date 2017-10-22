const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const errorHandler = require('./utils/error-handler');
const morgan = require('morgan');


app.use(morgan('dev'));
app.use(bodyParser.json());
const sitcoms = require('./routes/sitcoms');
const cartoons = require('./routes/cartoons');
const realitytv = require('./routes/realitytvs')
app.use('/api/sitcoms', sitcoms);
app.use('/api/cartoons', cartoons);
app.use('/api/realitytvs', realitytv);

app.use(errorHandler());

module.exports = app; 