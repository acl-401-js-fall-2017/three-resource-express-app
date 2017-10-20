const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema ({
    
    name: {
        type: String,
        required: true
    },

    stats: {
        HP: Number,
        MP: {type: Number, min:0},
        fighting: Boolean,
        combat: Boolean
    }

});

module.exports = mongoose.model('Cat', schema);