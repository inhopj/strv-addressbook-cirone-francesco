'use strict'

const { STATUS_CODES } = require('../config/constants')
const { getUserById } = require('../domains/auth/services')
const { CustomError } = require('../helpers/custom-error')
const { verifyJWT } = require('../helpers/token')

module.exports = async (req, res, next) => {
  
  if (!req.headers.authorization) {
    throw new CustomError('Missing authorization header', STATUS_CODES.UNAUTHORIZED)
  }

  const [, accessToken] = req.headers.authorization.split('Bearer ')

  const payload = await verifyJWT(accessToken)

  const user = await getUserById(payload.id)

  if (!user) {
    throw new CustomError('Unauthorized', STATUS_CODES.UNAUTHORIZED)
  }

  req.user = user
  return next()
}
