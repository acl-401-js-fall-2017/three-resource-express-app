const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartoonSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    releaseYear: Number,
    leadingCharacters: [{name: String, description: String}]
});


module.exports = mongoose.model('Cartoon', cartoonSchema);