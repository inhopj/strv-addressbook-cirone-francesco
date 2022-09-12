'use strict'
const {
  findUserByEmail,
  createUser,
  getAuthenticatedUser,
  findUserById
} = require('./operations')
const { signJWT } = require('../../helpers/token')
const { CustomError } = require('../../helpers/custom-error')
const { STATUS_CODES } = require('../../config/constants')

const registration = async (inputUser) => {
  
  const isEmailTaken = Boolean(await findUserByEmail(inputUser.email))
  
  if (isEmailTaken) {
    throw new CustomError('Email alreay taken', STATUS_CODES.BAD_REQUEST)
  }

  const newUser = await createUser(inputUser)
  return signJWT(newUser)
}

const login = async (inputUser) => {
  
  const user = await getAuthenticatedUser(inputUser)
  
  if (!user) {
    throw new CustomError('Incorrect email and/or password', STATUS_CODES.UNAUTHORIZED)
  }

  return signJWT(user)
}

const getUserById = async (id) => {
  
  const user = await findUserById(id)
  return user
}

module.exports = {
  registration,
  login,
  getUserById,
}
