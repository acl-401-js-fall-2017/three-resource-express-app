const Schema = require('mongoose').Schema;
const mongoose = require('mongoose');


const sportSchema = new Schema({
    type:String,
    violence: String,
    equipment: [
        {
            type:String,
            enum:[ 'ball', 'uniform', 'hoop', 'bat']
        }
    ]
});

module.exports = mongoose.model('Sport',sportSchema);