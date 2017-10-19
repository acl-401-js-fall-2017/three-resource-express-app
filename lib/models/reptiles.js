const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reptileSchema = new Schema({
    name: String,
    body: {
        numOfLegs: Number,
        wings: Boolean
    }
});


module.exports = mongoose.model('Reptile', reptileSchema);