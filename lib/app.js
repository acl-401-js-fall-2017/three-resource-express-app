const express = require('express');
const app = express();
const bodyParser = require('body-parser');


app.use(bodyParser.json());

const cartoons = require('./routes/cartoons');
app.use('/api/catoons', cartoons);

module.exports = app; 