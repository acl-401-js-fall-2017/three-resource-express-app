const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

const sitcomSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    releaseYear: Number, 
    cast: [{actor: String, role: String}]
});

module.exports = mongoose.model('cartoon', sitcomSchema);