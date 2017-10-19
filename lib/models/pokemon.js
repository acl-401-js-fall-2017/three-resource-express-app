const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pokemonSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    type: String,
    dateHatched: Date,
    
    trainer: [{
        name: String,
        badges: Number,
        numberOfCaught: Number
    }]
});

module.exports = mongoose.model('pokemon', pokemonSchema );
