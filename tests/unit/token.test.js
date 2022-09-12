'use strict'
const token = require('../../helpers/token')
const { describe, beforeAll, it, expect } = require('@jest/globals')
const { CustomError } = require('../../helpers/custom-error')

describe('token.js helper', () => {
  
  beforeAll(() => {
    process.env.JWT_SECRET = 'cb47233a2c44591101528cafc23f6318a365fc631f61d470fa4a98a38d52f268f65807b0e9d2a2d097d0cd6c05cfafa2e9b63f92317537e6d2d586368fef1d4b'
    process.env.JWT_EXPIRATION = '1h'
  })

  it('Should sign and verify a JWT', async () => {
   
    const user = {
      _id: '37873826726372378',
      email: 'user@test.com',
    }
    
    const jwt = token.signJWT(user)
    expect(jwt).not.toBeNull()
    
    const payload = await token.verifyJWT(jwt)
    expect(payload.id).toEqual(user._id)
    expect(payload.email).toEqual(user.email)
  })

  it('Should throw an error if the JWT is invalid', async () => {
    
    const user = {
      _id: '37873826726372378',
      email: 'user@test.com',
    }
    
    const jwt = token.signJWT(user)
    
    const expectedError = new CustomError('Invalid JWT', 401)
    await expect(token.verifyJWT(`${jwt}addingStuffToInvalidateTheJWT`)).rejects.toEqual(expectedError)
  })

  it('Should throw an error if the JWT is expired', async () => {
    
    process.env.JWT_SECRET = 'cb47233a2c44591101528cafc23f6318a365fc631f61d470fa4a98a38d52f268f65807b0e9d2a2d097d0cd6c05cfafa2e9b63f92317537e6d2d586368fef1d4b'
    // setting expiration < 1 millisecond order as test completes in ~1millisecond
    process.env.JWT_EXPIRATION = 0.00001
    
    const user = {
      _id: '37873826726372378',
      email: 'user@test.com',
    }
    
    const jwt = token.signJWT(user)
    expect(jwt).not.toBeNull()
    
    const expectedError = new CustomError('Invalid JWT', 401)
    await expect(token.verifyJWT(jwt)).rejects.toEqual(expectedError)
  })

})
