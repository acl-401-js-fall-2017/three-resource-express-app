const http = require('http');
const app = require('express');
const connect = require('.lib/connect');

// 27019 for my linux machine

connect();

const server = http.createServer(app);
const port = process.env.PORT || 3000;

server.listen(port, () => {
    //eslint-disable-next-line
    console.log('server running on', server.address().port);
});
