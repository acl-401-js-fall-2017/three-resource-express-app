const http = require('http');
const app = require('./lib/app');
const connect = require('./lib/connect');
require('dotenv').config();

const port = process.env.PORT || 3003;

const server = http.createServer(app);

server.listen(port, () => {
    console.log(`server listening at port ${port}`);
});