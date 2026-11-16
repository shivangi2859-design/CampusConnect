const mongoose = require('mongoose')

const lostItemSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('LostItem', lostItemSchema)