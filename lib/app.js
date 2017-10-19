const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

// const birds = require('./routes/birds');
// const mammals = require('./routes/mammals');
// const insects = require('./routes/insects');

module.exports = app;