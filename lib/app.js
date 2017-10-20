const express = require('express');
const app = express();
const bodyParser = require('body-parser');


app.use(bodyParser.json());

const cartoons = require('./routes/cartoons');
app.use('/api/cartoons', cartoons);

module.exports = app; 