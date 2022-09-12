'use strict'
const express = require('express')
const { addContact } = require('../domains/contacts/controller')
const authGate = require('../middlewares/auth-gate')

const router = express.Router()

router
  .route('/add')
  .post(
    authGate,
    addContact,
  )

module.exports = router
