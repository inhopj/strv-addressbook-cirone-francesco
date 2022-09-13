'use strict'
const { describe, beforeAll, afterAll, it, expect } = require('@jest/globals')
const request = require('supertest')
const { connect, disconnect } = require('./mongoDB')
const server = require('../../server')

beforeAll(async () => await connect())

afterAll(async () => await disconnect())

const testUser = {
  email: 'testUser@ciao.com',
  password: 'randomPassword123',
}

describe('Registration', () => {

  const userWithInvalidEmail = {
    email: 'testUserciao.com',
    password: 'randomPassword123',
  }

  const userWithShortPassword = {
    email: 'testUser@ciao.com',
    password: 'dfgdsdvf',
  }

  const userWithInvalidAdditionalField = {
    email: 'testUserciao.com',
    password: 'randomPassword',
    invalidField: 34
  }

  it('Should correctly register a new user', async () => {
    const response = await request(server)
      .post('/auth/registration')
      .send(testUser)
      .set('Accept', 'application/json')
      .expect(201)

    expect(response.body.status).toEqual('OK')
    expect(response.body.data).toHaveProperty('accessToken')
    expect(response.body.data.accessToken).not.toEqual(undefined)
  })

  it('Should throw an error if email is already taken', async () => {
    const response = await request(server)
      .post('/auth/registration')
      .send(testUser)
      .set('Accept', 'application/json')
      .expect(400)

    expect(response.body.status).toEqual('KO')
    expect(response.body.message).toEqual('Email alreay taken')

  })

  it('Should throw an error if email is invalid', async () => {
    const response = await request(server)
      .post('/auth/registration')
      .send(userWithInvalidEmail)
      .set('Accept', 'application/json')
      .expect(400)

    expect(response.body.status).toEqual('KO')
    expect(response.body.message).toEqual('Data does not satisfy schema')

  })

  it('Should throw an error if password does not satisfy minimum length of 10 characters', async () => {
    const response = await request(server)
      .post('/auth/registration')
      .send(userWithShortPassword)
      .set('Accept', 'application/json')
      .expect(400)

    expect(response.body.status).toEqual('KO')
    expect(response.body.message).toEqual('Data does not satisfy schema')

  })

  it('Should throw an error if request contains invalid additional field/s', async () => {
    const response = await request(server)
      .post('/auth/registration')
      .send(userWithInvalidAdditionalField)
      .set('Accept', 'application/json')
      .expect(400)

    expect(response.body.status).toEqual('KO')
    expect(response.body.message).toEqual('Data does not satisfy schema')

  })
})

describe('Login', () => {

  const userWithIncorrectEmail = {
    email: 'testUser@ciaoooo.com',
    password: 'randomPassword123',
  }

  const userWithIncorrectPassword = {
    email: 'testUser@ciao.com',
    password: 'randomPassword123456',
  }

  it('Should correctly login the provided user', async () => {
    const response = await request(server)
      .post('/auth/login')
      .send(testUser)
      .set('Accept', 'application/json')
      .expect(200)

    expect(response.body.status).toEqual('OK')
    expect(response.body.data).toHaveProperty('accessToken')
    expect(response.body.data.accessToken).not.toEqual(undefined)
  })

  it('Should throw an error if email is not correct', async () => {
    const response = await request(server)
      .post('/auth/login')
      .send(userWithIncorrectEmail)
      .set('Accept', 'application/json')
      .expect(401)

    expect(response.body.status).toEqual('KO')
    expect(response.body.message).toEqual('Incorrect email and/or password')

  })

  it('Should throw an error if password is not correct', async () => {
    const response = await request(server)
      .post('/auth/login')
      .send(userWithIncorrectPassword)
      .set('Accept', 'application/json')
      .expect(401)

    expect(response.body.status).toEqual('KO')
    expect(response.body.message).toEqual('Incorrect email and/or password')

  })
})
