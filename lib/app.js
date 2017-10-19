const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const morgan = require('morgan');
const boneRouter = require('./routes/boneRouter');

app.use(bodyParser.json());

app.use(morgan('combined'));

app.use('/api/bones', boneRouter);

module.exports = app;