/* eslint no-console: "off" */
const mongoose = require('mongoose');
//We want to use the native V8 Promise not the built-in one.
// bit of a legacy deal, just something we need to do
mongoose.Promise = Promise;

// this env name "MONGODB_URI" is used by heroku when adding an mLab instance
const defaultUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/rockets';

module.exports = function(dbUri = defaultUri) {

    const promise = mongoose.connect(dbUri, { useMongoClient: true });

    // CONNECTION EVENTS
    // When successfully connected
    mongoose.connection.on('connected', function () {
        console.log('Mongoose default connection open to ' + dbUri);
    });

    //if the connection throw an error
    mongoose.connection.on('disconnected', function (err){
        console.log('Mongoose default connection error: ' + err);
    });

    //When the connection is disconnected
    mongoose.connection.on('disconnected', function() {
        console.log('Mongoose default connection disconnected');
    });

    //If the Node process ends, close the Mongoose connection
    process.on('SIGINT', function() {
        mongoose.connection.close(function (){
            console.log('Mongoose default connection disconnected through app termination');
            process.exit(0);
        });
    });

    return promise;
};