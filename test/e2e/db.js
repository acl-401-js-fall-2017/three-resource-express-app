const mongoose = require('mongoose');
const connect = require('../../lib/connect');

before(() => connect());

after(() => mongoose.connection.close());