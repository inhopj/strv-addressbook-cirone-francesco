'use strict'
const { addContact } = require('./operations')

const addition = async (inputContact) => {
  await addContact(inputContact)
}

module.exports = {
  addition,
}
