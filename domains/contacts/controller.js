'use strict'
const { STATUS_CODES, STATUSES } = require('../../config/constants')
const { validate } = require('../../helpers/schema-validator')
const contactsServices = require('./services')

const addContact = async (req, res, next) => {

  const contactSchema = {
    type: 'Object',
    required: true,
    properties: {
      firstName: { type: 'string', required: true },
      lastName: { type: 'string', required: true },
      phoneNumber: { type: 'string', required: true },
      address: { type: 'string', required: true },
      user: { type: 'string', required: true },
    },
  }

  const { firstName, lastName, phoneNumber, address } = req.body
  // This controller get executed only if user authenticated --> passed auth-gate --> we have an user inside req 
  const { email } = req.user

  const contactInstance = {
    firstName,
    lastName,
    phoneNumber,
    address,
    user: email
  }

  validate(contactInstance, contactSchema)
  
  await contactsServices.addition(contactInstance)

  res.status(STATUS_CODES.CREATED).json({
    status: STATUSES.OK,
  })
}

module.exports = {
  addContact,
}
