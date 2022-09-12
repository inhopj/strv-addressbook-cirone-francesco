'use strict'
const STATUS_CODES = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500
}

const STATUSES = {
  OK: 'OK',
  KO: 'KO'
}

const ENVIRONMENTS = {
  DEVELOPMENT: 'development',
  PRODUCTION: 'production',
  TEST: 'test'
}

const FIREBASE_DB_URL = 'https://strv-addressbook-cirone-fra.firebaseio.com'

module.exports = {
  STATUS_CODES,
  STATUSES,
  ENVIRONMENTS,
  FIREBASE_DB_URL
}