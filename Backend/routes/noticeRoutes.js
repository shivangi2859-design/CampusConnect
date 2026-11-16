const express = require('express')
const router = express.Router()
const Notice = require('../models/Notice')

// GET: All notices
router.get('/', async (req, res) => {
    try {
        const notices = await Notice.find().sort({ date: -1 })
        res.json(notices)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// POST: Add a new notice
router.post('/', async (req, res) => {
    try {
        const newNotice = new Notice(req.body)
        const savedNotice = await newNotice.save()
        res.status(201).json(savedNotice)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})
// DELETE: Remove a notice
router.delete('/:id', async (req, res) => {
    try {
        console.log('Delete request received:', req.params.id)
        const deletedNotice = await Notice.findByIdAndDelete(req.params.id)

        if (!deletedNotice) {
            return res.status(404).json({ message: 'Notice not found' })
        }

        res.json({ message: 'Notice deleted successfully' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})
module.exports = router