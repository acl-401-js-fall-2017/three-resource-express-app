const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');

app.use(bodyParser.json());

app.use(morgan('combined'));

app.get('/', (req, res) => {
    res.send('hello!');
});

module.exports = app;