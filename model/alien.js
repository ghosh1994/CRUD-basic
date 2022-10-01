const mongoose = require('mongoose')

const alienSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    tech: {
        type: String,
        required: true
    },
    subscribed: {
        type: Boolean,
        required: true,
        default: false
    },
    role: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    }
})

//Exporting alienSchema as the name of Alien
module.exports = mongoose.model('Alien', alienSchema);
