const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const insectSchema = new Schema({
    name: String,
    body: {
        numOfLegs: Number,
        wings: Boolean
    }
});


module.exports = mongoose.model('Insect', insectSchema);