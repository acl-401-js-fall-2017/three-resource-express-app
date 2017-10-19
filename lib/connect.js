const mongoose = require('mongoose');
require('dotenv').config();
mongoose.Promise = Promise;

const defaultUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/three_resource_express';

module.exports = function(dbUri = defaultUri) {
    const promise = mongoose.connect(dbUri);

    mongoose.connection.on('connected', () => {
        console.log('Mongoose default connection: connected at ', dbUri);
    });

    mongoose.connection.on('error', err => {
        console.log('Mongoose default connection: error: ', err);
    });

    mongoose.connection.on('disconnected', () => {
        console.log('Mongoose default connection: disconnected');
    });

    process.on('SIGINT', () => {
        mongoose.connection.close(() => {
            console.log('connection terminated by app close');
            process.exit();
        });
    });

    return promise;
};