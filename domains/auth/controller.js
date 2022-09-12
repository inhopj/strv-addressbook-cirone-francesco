'use strict'
const { STATUS_CODES, STATUSES } = require('../../config/constants')
const { validate } = require('../../helpers/schema-validator')
const authServices = require('../auth/services')

const registration = async (req, res, next) => {
  
  const registerSchema = {
    type: 'Object',
    required: true,
    properties: {
      email: {
        type: 'string',
        format: 'email',
        required: true
      },
      password: {
        type: 'string',
        required: true,
        minLength: 10,
        // pattern: /(?=(.*[0-9]){1,})(?=(.*[a-z]){1,})(?=(.*[A-Z]){1,})/
      },
    },
  }
  const { email, password } = req.body
  const userInstance = {
    email,
    password
  }

  validate(userInstance, registerSchema)

  const accessToken = await authServices.registration(userInstance)

  res.status(STATUS_CODES.CREATED).json({
    status: STATUSES.OK,
    data: {
      accessToken,
    },
  })
}

const login = async (req, res, next) => {
  
  const loginSchema = {
    type: 'Object',
    required: true,
    properties: {
      email: {
        type: 'string',
        format: 'email',
        required: true
      },
      password: {
        type: 'string',
        required: true,
      },
    },
  }
  const userInstance = {
    email: req.body.email,
    password: req.body.password,
  }

  validate(userInstance, loginSchema)

  const accessToken = await authServices.login(userInstance)

  res.status(STATUS_CODES.OK).json({
    status: STATUSES.OK,
    data: {
      accessToken,
    },
  })
}


module.exports = {
  registration,
  login
}
