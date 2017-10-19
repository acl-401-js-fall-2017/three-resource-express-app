const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    yearFounded: {
        type: Number,
        min: 1900
    },
    location: {
        country: String,
        state: String,
        city: String
    }
});

module.exports = mongoose.model('Studio', schema);