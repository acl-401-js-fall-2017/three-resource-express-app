const express = require('express');
const app = express();
const homes = require('./routes/homes');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use('/api/homes/', homes);



module.exports = app;