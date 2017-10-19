const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    dob: String,
    oscarNoms: {
        type: Number,
        max: 20
    }
});

module.exports = mongoose.model('Actor', schema);