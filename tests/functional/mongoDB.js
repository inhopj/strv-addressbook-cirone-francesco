'use strict'
const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')
// spin a MongoDB instance
const mongoDB = MongoMemoryServer.create()

const connect = async () => {
  const uri = (await mongoDB).getUri()
  await mongoose.connect(uri)
}

const disconnect = async () => {
  await mongoose.connection.dropDatabase()
  await mongoose.connection.destroy()
}

const clearDb = async () => {
  const collectionsKeys = Object.keys(mongoose.connection.collections)
  // drop (in parallel) every collection including all documents and indexes 
  const promiseArray = collectionsKeys.map(key => mongoose.connection.dropCollection(key))
  await Promise.all(promiseArray)
}

module.exports = {
  connect,
  disconnect,
  clearDb,
}
