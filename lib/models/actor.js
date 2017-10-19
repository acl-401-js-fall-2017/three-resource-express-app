const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const actorSchema = new Schema({
    name:{ 
        type: String,
        required: true 
    },
    gender: String,
    dateOfBirth: Date,
    movies:[{
        type: String,
        required: true
    }]
});


module.exports = mongoose.model('Actor', actorSchema);