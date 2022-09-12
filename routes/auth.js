'use strict'
const express = require('express')
const { registration, login } = require('../domains/auth/controller')

const router = express.Router()

router
  .route('/registration')
  .post(registration)

router
  .route('/login')
  .post(login)

module.exports = router
