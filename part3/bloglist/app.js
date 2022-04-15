const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const mongoose = require('mongoose')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const errorHandler = require('./utils/middleware/errorHandler')
const unknownEndpoint = require('./utils/middleware/unknownEndpoint')
const usersReturner = require('./utils/middleware/userReturner')
const app = express()

const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl)

app.use(cors())
app.use(express.json())

app.use('/api/blogs', usersReturner ,blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.use(unknownEndpoint)
app.use(errorHandler)

module.exports = app