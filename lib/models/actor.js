const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const actorSchema = new Schema( {
    name: {
        type: String,
        required: true
    },
    movies: [String],
});

module.exports = mongoose.model('Actor', actorSchema);