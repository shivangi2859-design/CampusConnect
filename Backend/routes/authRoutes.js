const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Student = require('../models/Student')

// Student Registration
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body

        if (!name || !email || !password) {
            return res.status(400).json({
                message: 'All fields are required'
            })
        }

        if (password.length < 8) {
            return res.status(400).json({
                message: 'Password must be at least 8 characters'
            })
        }

        const existingStudent = await Student.findOne({
            email: email.trim().toLowerCase()
        })

        if (existingStudent) {
            return res.status(409).json({
                message: 'Email already registered'
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const student = new Student({
            name,
            email,
            password: hashedPassword
        })

        await student.save()

        res.status(201).json({
            message: 'Registration successful'
        })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// Student Login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({
                message: 'Email and password are required'
            })
        }

        const student = await Student.findOne({
            email: email.trim().toLowerCase()
        })

        if (!student) {
            return res.status(401).json({
                message: 'Invalid email or password'
            })
        }

        const isMatch = await bcrypt.compare(
            password,
            student.password
        )

        if (!isMatch) {
            return res.status(401).json({
                message: 'Invalid email or password'
            })
        }

        const token = jwt.sign(
            { id: student._id },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        )

        res.json({
            message: 'Login successful',
            token,
            student: {
                id: student._id,
                name: student.name,
                email: student.email
            }
        })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = router