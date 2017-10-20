const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({

    name: {
        type: String,
        required: true
    },

    powers: {
        handsome: Boolean
    }

});

module.exports = mongoose.Model('Burd', schema);