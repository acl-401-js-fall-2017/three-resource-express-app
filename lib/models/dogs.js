const Schema = require('mongoose').Schema;
const mongoose = require('mongoose');

const dogSchema = new Schema({
    name:{type:String, required: true},
    type: String,
    favoriteToy:String 
});

module.exports = mongoose.model('Dog', dogSchema);