const express = require('express')
const router = express.Router()
const HelpDesk = require('../models/HelpDesk')

// GET: Fetch all questions
router.get('/', async (req, res) => {
    try {
        const questions = await HelpDesk.find().sort({ date: -1 })
        res.json(questions)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// POST: Submit a question
router.post('/', async (req, res) => {
    try {
        const newQuestion = new HelpDesk(req.body)
        const savedQuestion = await newQuestion.save()
        res.status(201).json(savedQuestion)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

// DELETE: Delete a question
router.delete('/:id', async (req, res) => {
    try {
        const deletedQuestion = await HelpDesk.findByIdAndDelete(req.params.id)

        if (!deletedQuestion) {
            return res.status(404).json({ message: 'Question not found' })
        }

        res.json({ message: 'Question deleted successfully' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = router