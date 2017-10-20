const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teamSchema = new Schema({
    make: {
        type: String,
        required: true
    },
    drivers: {       
        type: [String],
        required: true
    },
    class: {
        type: [String],
        required: true
    },
    trophies: {
        type: Number,
        min: 1
    }
});

module.exports = mongoose.model('Team', teamSchema);