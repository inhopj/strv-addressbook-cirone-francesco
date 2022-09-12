
'use strict'

const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const { FIREBASE_DB_URL } = require('../constants');

const {
  FIREBASE_TYPE,
  FIREBASE_PROJECT_ID,
  FIREBASE_PRIVATE_KEY_ID,
  FIREBASE_PRIVATE_KEY,
  FIREBASE_CLIENT_EMAIL,
  FIREBASE_CLIENT_ID,
  FIREBASE_AUTH_URI,
  FIREBASE_TOKEN_URI,
  FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
  FIREBASE_CLIENT_X509_CERT_URL
} = process.env

initializeApp({
  credential: cert({
    'type': FIREBASE_TYPE,
    'project_id': FIREBASE_PROJECT_ID,
    'private_key_id': FIREBASE_PRIVATE_KEY_ID,
    /*
    * Had to use this replace "workaround" to solve "FirebaseAppError: Failed to parse private key: Error: Invalid PEM formatted message"
    * as explained her https://github.com/gladly-team/next-firebase-auth/discussions/95
    * TODO - Similarly to what I've done for the JWT I could base64 encode the whole serviceAccount.json file containing all this info
    * and add it as a single Heroku env var instead of having one env var for each field, I'll then just have to decode it in here
    */
    'private_key': FIREBASE_PRIVATE_KEY.replace(/\\n/gm, '\n'),
    'client_email': FIREBASE_CLIENT_EMAIL,
    'client_id': FIREBASE_CLIENT_ID,
    'auth_uri': FIREBASE_AUTH_URI,
    'token_uri': FIREBASE_TOKEN_URI,
    'auth_provider_x509_cert_url': FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
    'client_x509_cert_url': FIREBASE_CLIENT_X509_CERT_URL
  }),
  databaseURL: FIREBASE_DB_URL
});

const db = getFirestore()

module.exports = db
