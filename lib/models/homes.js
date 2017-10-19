const Schema = require('mongoose').Schema;
const mongoose = require('mongoose');

const homeSchema = new Schema({
    type:String,
    address:{
        street: String,
        unit: String,
        state:{ type: String, enum:['OR', 'CA']},
        zip: Number
    }
});

module.exports = mongoose.model('Home',homeSchema);