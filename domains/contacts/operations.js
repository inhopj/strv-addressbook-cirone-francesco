'use strict'
const db = require('../../config/databases/firestore')

// Note that for each user there will be a dedicated Firestore collection of contacts
const addContact = async (contact) => {
  await db.collection(contact.user).add(contact)
}

module.exports = {
  addContact,
}
