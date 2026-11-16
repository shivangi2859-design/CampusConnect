const express = require('express')
const router = express.Router()
const Event = require('../models/Event')

// GET: Fetch all events
router.get('/', async (req, res) => {
    try {
        const events = await Event.find().sort({ date: -1 })
        res.json(events)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// POST: Add a new event
router.post('/', async (req, res) => {
    try {
        const newEvent = new Event(req.body)
        const savedEvent = await newEvent.save()
        res.status(201).json(savedEvent)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

// DELETE: Remove an event
router.delete('/:id', async (req, res) => {
    try {
        const deletedEvent = await Event.findByIdAndDelete(req.params.id)

        if (!deletedEvent) {
            return res.status(404).json({ message: 'Event not found' })
        }

        res.json({ message: 'Event deleted successfully' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = router