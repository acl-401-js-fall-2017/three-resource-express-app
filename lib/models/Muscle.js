const mongoose = require('mongoose');

const muscleSche = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    origin: [String],
    insertion: [String],
    action: [{
        joint: [String],
        actsOn: [String],
        movement: [String]
    }],
    innervation: [String]
});

module.exports = mongoose.model('Muscle', muscleSche);