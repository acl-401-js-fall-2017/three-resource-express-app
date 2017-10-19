const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const driverSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        min: 17,
        required: true
    },
    wins: {
        type: Number,
        min: 0,
        required: true
    }
});

module.exports = mongoose.model('Driver', driverSchema);