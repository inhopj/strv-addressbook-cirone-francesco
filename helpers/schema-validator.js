'use strict'
const { Validator } = require('jsonschema')
const { STATUS_CODES } = require('../config/constants')
const { CustomError } = require('./custom-error')

const validate = (instance, schema) => {
  const validator = new Validator()

  const { errors } = validator.validate(instance, schema, {allowUnknownAttributes: false})
  if (errors.length > 0) {

    throw new CustomError('Data does not satisfy schema', STATUS_CODES.BAD_REQUEST)
  }
}

module.exports = {
  validate
}