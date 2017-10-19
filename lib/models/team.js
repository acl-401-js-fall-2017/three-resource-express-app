const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teamSchema = new Schema({
    make: {
        type: String,
        required: true
    },
    drivers: [{
        name: String,
        seasons: Number
    }],
    trophies: {
        type: Number,
        min: 1,
        required: true
    }
});

module.exports = mongoose.model('Team', teamSchema);