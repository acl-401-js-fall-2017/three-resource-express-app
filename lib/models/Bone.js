const mongoose = require('mongoose');
const {Schema} = mongoose;

const boneSche = new Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['long', 'short', 'flat', 'sesamoid', 'irregular']
    },
    joints: [String],
    muscles: [String],
    nerves: [String]
});

module.exports = mongoose.model('Bone', boneSche);