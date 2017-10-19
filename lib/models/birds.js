const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const birdSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    color: String
});

module.exports = mongoose.model('Bird', birdSchema);