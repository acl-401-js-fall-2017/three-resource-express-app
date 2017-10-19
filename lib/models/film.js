const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    title: {
        type: String,
        required: true
    },
    releaseYear: {
        type: Number,
        required: true,
        min: 1890
    },
    runTime: {
        type: Number,
        min: 0
    },
    genre: String,
    director: String
});

module.exports = mongoose.model('Film', schema);