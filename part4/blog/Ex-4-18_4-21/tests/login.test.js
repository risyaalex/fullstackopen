const request = require('supertest')
const app = require('../app')

describe('Login Route', () => {
  test('Successful login should return a JWT token', async () => {
    const response = await request(app).post('/api/login').send({
      username: 'usernameAlex',
      password: 'password',
    })

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('token')
  })

  test('Invalid login should return 401 Unauthorized', async () => {
    const response = await request(app).post('/api/login').send({
      username: 'invaliduser',
      password: 'invalidpassword',
    })

    expect(response.status).toBe(401)
  })
})
