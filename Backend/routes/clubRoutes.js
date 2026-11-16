const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')

const Club = require('../models/Club')
const ClubMembership = require('../models/ClubMembership')
const authMiddleware = require('../middleware/authMiddleware')

// GET: Fetch clubs with current student's joining status
router.get('/', async (req, res) => {
    try {
        let studentId = null
        const authHeader = req.headers.authorization

        if (authHeader && authHeader.startsWith('Bearer ')) {
            const token = authHeader.split(' ')[1]
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            studentId = decoded.id
        }

        const clubs = await Club.find().sort({ date: -1 })

        let joinedClubIds = []

        if (studentId) {
            const memberships = await ClubMembership.find({
                studentId
            })

            joinedClubIds = memberships.map(
                (membership) => membership.clubId.toString()
            )
        }

        const result = clubs.map((club) => ({
            ...club.toObject(),
            isJoined: joinedClubIds.includes(club._id.toString())
        }))

        res.json(result)

    } catch (error) {
        res.status(401).json({ message: 'Unable to fetch clubs' })
    }
})

// POST: Join a club (login required)
router.post('/', authMiddleware, async (req, res) => {
    try {
        const { name } = req.body

        if (!name) {
            return res.status(400).json({
                message: 'Club name is required'
            })
        }

        let club = await Club.findOne({ name })

        if (!club) {
            club = await Club.create({ name })
        }

        const membership = await ClubMembership.create({
            studentId: req.studentId,
            clubId: club._id
        })

        await Club.findByIdAndUpdate(club._id, {
            $inc: { members: 1 }
        })

        res.status(201).json({
            message: 'Successfully joined club',
            membership
        })

    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({
                message: 'You have already joined this club'
            })
        }

        res.status(500).json({ message: error.message })
    }
})

module.exports = router