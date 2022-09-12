'use strict'
const { STATUS_CODES, STATUSES } = require('../config/constants')
const { DEVELOPMENT } = require('../config/constants').ENVIRONMENTS

const errorHandler = (error, req, res, next) => {
  error.statusCode = error.statusCode || STATUS_CODES.INTERNAL_SERVER_ERROR
  error.status = STATUSES.KO

  const { status, statusCode, message, stack } = error
  if (process.env === DEVELOPMENT) {
    // log more useful info in development
    res.status(error.statusCode).json({
      status,
      statusCode,
      message,
      stack
    })
  } else {
    res.status(error.statusCode).json({
      status,
      message
    })
  }
}

module.exports = {
  errorHandler
}