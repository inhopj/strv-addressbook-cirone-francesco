'use strict'
const { sign, verify } = require('jsonwebtoken')
const { promisify } = require('util')
const { STATUS_CODES } = require('../config/constants')
const { CustomError } = require('./custom-error')

const decodeJWTSecret = (secret) => Buffer.from(secret, 'hex')

const signJWT = (user) => {

  const payload = {
    id: user._id,
    email: user.email,
  }
  const options = {
    expiresIn: process.env.JWT_EXPIRATION,
    algorithm: 'HS512',
  }

  return sign(
    payload,
    decodeJWTSecret(process.env.JWT_SECRET),
    options
  )
}

const verifyJWT = async (token) => {
  try {
    const payload = await promisify(verify)(token, decodeJWTSecret(process.env.JWT_SECRET))
    return payload
  } catch (error) {
    throw new CustomError('Invalid JWT', STATUS_CODES.UNAUTHORIZED)
  }
}

module.exports = {
  signJWT,
  verifyJWT,
}

