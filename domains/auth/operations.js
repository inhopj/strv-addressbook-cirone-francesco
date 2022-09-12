'use strict'
const User = require('./models/user')

const createUser = (user) => User.create(user)

const findUserById = (id) => User.findById(id)

const findUserByEmail = (email) => User.findOne({ email })

const getAuthenticatedUser = async (user) => {
  const authenticatedUser = await findUserByEmail(user.email).select('password')

  if (!authenticatedUser || !await authenticatedUser.comparePassword(user.password, authenticatedUser.password)) {
    return null
  }

  return authenticatedUser
}

module.exports = {
  findUserByEmail,
  findUserById,
  createUser,
  getAuthenticatedUser,
}
