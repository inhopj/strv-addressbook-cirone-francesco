'use strict'

// External modules
const express = require('express')
require('express-async-errors');
const { STATUS_CODES, ENVIRONMENTS } = require('./config/constants')
const DEFAULT_ENV = ENVIRONMENTS.PRODUCTION
const DEFAULT_PORT = 3000
const NODE_ENV = process.env.NODE_ENV || DEFAULT_ENV
require('dotenv').config()

// Security modules
const cors = require('cors')
const expressMongoSanitize = require('express-mongo-sanitize')
const helmet = require('helmet')
const xss = require('xss-clean')
const hpp = require('hpp')

// Logger
const pino = require('express-pino-logger')

// Custom modules
const mongo = require('./config/databases/mongo')
const authRouter = require('./routes/auth')
const contactsRouter = require('./routes/contacts')
const { CustomError } = require('./helpers/custom-error')
const { errorHandler } = require('./middlewares/error')

// Express server
const server = express()
const port = process.env.PORT || DEFAULT_PORT

// Middlewares
server.use(helmet())
server.use(cors())
server.use(expressMongoSanitize())
server.disable('x-powered-by')
server.use(express.json({ limit: '20kb' }))
server.use(express.urlencoded({ extended: true, limit: '20kb' }))
server.use(xss())
server.use(hpp())

// Development logging
if (NODE_ENV === ENVIRONMENTS.DEVELOPMENT) {
  server.use(pino)
}

// Routes
server.use('/auth', authRouter)
server.use('/contacts', contactsRouter)

// Error handlers
server.all('*', (req, res, next) => {
  throw new CustomError('Not found', STATUS_CODES.NOT_FOUND)
})
server.use(errorHandler)

// MongoDB connection and server listening
if (
  NODE_ENV === ENVIRONMENTS.PRODUCTION ||
  NODE_ENV === ENVIRONMENTS.DEVELOPMENT
) {
  mongo.connect()
  server.listen(port, () => {
    console.log(`Server running on port ${port}`)
  })
}


module.exports = server
