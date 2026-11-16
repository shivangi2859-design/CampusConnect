const mongoose = require('mongoose')

const clubMembershipSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    clubId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Club',
        required: true
    }
}, {
    timestamps: true
})

clubMembershipSchema.index(
    { studentId: 1, clubId: 1 },
    { unique: true }
)

module.exports = mongoose.model('ClubMembership', clubMembershipSchema)