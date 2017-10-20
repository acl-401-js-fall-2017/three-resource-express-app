const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const errorHandler = require('./utils/error-handler');



app.use(bodyParser.json());

const cartoons = require('./routes/cartoons');
app.use('/api/cartoons', cartoons);

app.use(errorHandler());

module.exports = app; 