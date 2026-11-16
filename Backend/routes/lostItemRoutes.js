const express = require('express')
const router = express.Router()
const LostItem = require('../models/LostItem')

// GET: Fetch all reported items
router.get('/', async (req, res) => {
    try {
        const items = await LostItem.find().sort({ date: -1 })
        res.json(items)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// POST: Report a new item
router.post('/', async (req, res) => {
    try {
        const newItem = new LostItem(req.body)
        const savedItem = await newItem.save()
        res.status(201).json(savedItem)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

// DELETE: Remove a reported item
router.delete('/:id', async (req, res) => {
    try {
        const deletedItem = await LostItem.findByIdAndDelete(req.params.id)

        if (!deletedItem) {
            return res.status(404).json({ message: 'Item not found' })
        }

        res.json({ message: 'Item deleted successfully' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = router