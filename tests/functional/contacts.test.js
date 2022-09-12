'use strict'
const { describe, beforeAll, afterAll, afterEach, it, expect } = require('@jest/globals')
const request = require('supertest')
const { connect, disconnect, clearDb } = require('./mongoDB')
const server = require('../../server')

beforeAll(async () => await connect())

afterAll(async () => await disconnect())

describe('Contact addition', () => {
  
  afterEach(async () => clearDb())

  const testUser = {
    email: 'testUser@ciao.com',
    password: 'randomPassword123',
  }

  const testContact = {
    firstName: 'Random',
    lastName: 'Name',
    phoneNumber: '+390123456789',
    address: 'Via delle vie, 10'
  }

  it('Should create a new contact', async () => {
    const registeredUserResponse = await request(server)
      .post('/auth/registration')
      .send(testUser)
      .set('Accept', 'application/json')

    const { accessToken } = registeredUserResponse.body.data

    const response = await request(server)
      .post('/contacts/add')
      .send(testContact)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(201)

    expect(response.body.status).toEqual('OK')

  })
})

describe('Auth-gate', () => {

  const testContact = {
    firstName: 'Random',
    lastName: 'Name',
    phoneNumber: '+390123456789',
    address: 'Via delle vie, 10',
  }

  const testUser = {
    email: 'testUser@ciao.com',
    password: 'randomPassword123',
  }

  it('Should return Unauthorized if authorization header is missing', async () => {

    const response = await request(server)
      .post('/contacts/add')
      .send(testContact)
      .set('Accept', 'application/json')
      .expect(401)

    expect(response.body.status).toEqual('KO')
    expect(response.body.message).toEqual('Missing authorization header')

  })

  it('Should return Unauthorized if user not found in Database', async () => {
    const registeredUserResponse = await request(server)
      .post('/auth/registration')
      .send(testUser)
      .set('Accept', 'application/json')
    const { accessToken } = registeredUserResponse.body.data

    await clearDb()

    const response = await request(server)
      .post('/contacts/add')
      .send(testContact)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(401)

    expect(response.body.status).toEqual('KO')
    expect(response.body.message).toEqual('Unauthorized')

  })
})

describe('Route not found', () => {

  it('Should return 404 Not found if requested route does not exist', async () => {

    const response = await request(server)
      .post('/some/random/route')
      .set('Accept', 'application/json')
      .expect(404)

    expect(response.body.status).toEqual('KO')
    expect(response.body.message).toEqual('Not found')

  })

})

