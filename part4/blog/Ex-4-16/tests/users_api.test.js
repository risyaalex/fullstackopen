const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcryptjs')

const app = require('../app')
const api = supertest(app)

const helper = require('./test_helper')
const User = require('../models/users')

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'Alex',
      name: 'Alex',
      password: 'password',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map((u) => u.username)
    expect(usernames).toContain(newUser.username)
  })
})

describe('User API', () => {
  test('Create user with empty username should return 400', async () => {
    const newUser = {
      username: '',
      name: 'Alex',
      password: 'password',
    }

    const response = await supertest(app)
      .post('/api/users')
      .send(newUser)
      .expect(400)

    expect(response.body.error).toBe(
      'Username must be at least 3 characters long'
    )
  })

  test('Create user with empty password should return 400', async () => {
    const newUser = {
      username: 'Alex',
      name: 'Alex',
      password: '',
    }

    const response = await supertest(app)
      .post('/api/users')
      .send(newUser)
      .expect(400)

    expect(response.body.error).toBe(
      'Password must be at least 3 characters long'
    )
  })

  test('Create user with too short username should return 400', async () => {
    const newUser = {
      username: 'Al',
      name: 'Alex',
      password: 'password',
    }

    const response = await supertest(app)
      .post('/api/users')
      .send(newUser)
      .expect(400)

    expect(response.body.error).toBe(
      'Username must be at least 3 characters long'
    )
  })

  test('Create user with too short password should return 400', async () => {
    const newUser = {
      username: 'Alex',
      name: 'Alex',
      password: '12',
    }

    const response = await supertest(app)
      .post('/api/users')
      .send(newUser)
      .expect(400)

    expect(response.body.error).toBe(
      'Password must be at least 3 characters long'
    )
  })

  test('User with non-unique username is not created', async () => {
    await User.deleteMany({})

    const existingUser = {
      username: 'Alex',
      name: 'Alex',
      password: 'password',
    }

    await api.post('/api/users').send(existingUser)

    const response = await api.post('/api/users').send(existingUser).expect(400)

    expect(response.text).toContain('Username must be unique')
  })
})

afterAll(() => {
  mongoose.connection.close()
})
