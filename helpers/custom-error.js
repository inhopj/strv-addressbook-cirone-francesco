'use strict'
const { STATUSES } = require('../config/constants')

class CustomError extends Error {
  constructor(message, statusCode) {
    super(message)

    this.statusCode = statusCode
    this.status = STATUSES.KO
    this.name = this.constructor.name

    Error.captureStackTrace(this, this.constructor)
  }
}

module.exports = {
  CustomError
}
