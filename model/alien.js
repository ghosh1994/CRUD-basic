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
    tech: {
        type: Boolean,
        required: true,
        default: false
    }
})

//Exporting alienSchema as the name of Alien
module.exports = mongoose.model('Alien', alienSchema);