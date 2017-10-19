const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mammalSchema = new Schema({
    name: String,
    numOfLegs: {
        type: Number,
        min: 0,
        max: 4
    },
    color: [String]
});

module.exports = mongoose.model('Mammal', mammalSchema);