const express = require('express');
const app = express();
const bodyParser = require('body-parser');


app.use(express.static('./public'));
app.use(bodyParser.json());

const rockets = require('./routes/rockets');
app.use('/api/rockets', rockets);

module.exports = app;