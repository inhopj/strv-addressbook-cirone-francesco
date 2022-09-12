'use strict'
const mongoose = require('mongoose')
const { Schema } = mongoose
const bcrypt = require('bcrypt')
const validator = require('validator/validator')
const { CustomError } = require('../../../helpers/custom-error')
const { STATUS_CODES } = require('../../../config/constants')
const SALT_WORK_FACTOR = 10
const PASSWORD_MIN_LENGTH = 10

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validator: validator.isEmail,
    lowercase: true,
  },
  password: {
    type: String,
    minlength: PASSWORD_MIN_LENGTH,
    required: true,
    select: false,
  },
})

userSchema.pre('save', async function (next) {

  // hash password only if it has been modified (or is new)
  if (!this.isModified('password')) {
    return next()
  }

  try {
    // salt generation
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR)
    // password hashing
    this.password = await bcrypt.hash(this.password, salt)
    return next()
  } catch (error) {
    throw new CustomError('Could not perform password hashing', STATUS_CODES.BAD_REQUEST)
  }
});

userSchema.methods.comparePassword = async function (candidatePassword, userPassword) {
  return await bcrypt.compare(candidatePassword, userPassword)
}

const User = mongoose.model('User', userSchema)

module.exports = User
