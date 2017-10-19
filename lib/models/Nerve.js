const mongoose = require('mongoose');

const nerveSche = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    alias: [String],
    sensory: Boolean,
    motor: Boolean,
    branchOf: [String],
    branches: [String],
    innervates: []
});

module.exports = mongoose.model('Nerve', nerveSche);