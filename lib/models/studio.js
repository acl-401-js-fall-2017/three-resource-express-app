const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studioSchema = new Schema({
    name:{
        type: String, 
        required: true
    },
    address: {
        street: String,
        city: String,
        state: {
            type: String,
            required: true
        },
        zip: Number
    },
    founded: Date,
    numberOfMovies: {
        type: Number,
        min:1
    }
});


module.exports = mongoose.model('Studio', studioSchema);