const mongoose = require('mongoose')

const helpDeskSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('HelpDesk', helpDeskSchema)