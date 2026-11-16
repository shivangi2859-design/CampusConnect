const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()

const app = express()

app.use(cors())
app.use(express.json())
const noticeRoutes = require('./routes/noticeRoutes')
const eventRoutes = require('./routes/eventRoutes')
const lostItemRoutes = require('./routes/lostItemRoutes')
const helpDeskRoutes = require('./routes/helpDeskRoutes')
const clubRoutes = require('./routes/clubRoutes')
const authRoutes = require('./routes/authRoutes')
app.use('/api/notices', noticeRoutes)
app.use('/api/events', eventRoutes)
app.use('/api/lost-items', lostItemRoutes)
app.use('/api/help-desk', helpDeskRoutes)
app.use('/api/clubs', clubRoutes)
app.use('/api/auth', authRoutes)
app.get('/', (req, res) => {
    res.send('CampusConnect Backend is Running!')
})
mongoose.connect('mongodb://127.0.0.1:27017/campusconnect')
    .then(() => {
        console.log('MongoDB Connected Successfully!')
    })
    .catch((error) => {
        console.log('MongoDB Connection Error:', error)
    })
const PORT = 5000

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})