const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const raceSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    class: [String],
    course: [{
        name: String,
        location: String,
    }],
    raceDate: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('Race', raceSchema);