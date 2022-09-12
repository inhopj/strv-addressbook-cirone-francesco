'use strict'
const mongoose = require('mongoose')
const { CustomError } = require('../../helpers/custom-error')
const { MONGODB_URI } = process.env

const connect = async () => {

  // Adding this just as reference, from mongoDB v.6 and above are defaulted like so
  const connectionOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }

  try {
    const connection = await mongoose.connect(MONGODB_URI, connectionOptions)
    console.log('Successfully connected to MongoDB!')
  } catch (error) {
    throw new CustomError('Could not connect to MongoDB')
  }
}

module.exports = {
  connect
}
