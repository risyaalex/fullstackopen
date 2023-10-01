const app = require('../app')
const supertest = require('supertest')
const mongoose = require('mongoose')
const Blog = require('../models/blogs')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
})

describe('GET /api/blogs', () => {
  test('returns a JSON array of blogs', async () => {
    const initialBlogs = [
      {
        title: 'Blog 1',
        author: 'Author 1',
        url: 'http://1.com/',
        likes: 5,
      },
      {
        title: 'Blog 2',
        author: 'Author 2',
        url: 'http://2.com/',
        likes: 10,
      },
    ]

    await Blog.insertMany(initialBlogs)

    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body).toHaveLength(initialBlogs.length)
  })

  test('returns 404 if no blogs are found', async () => {
    await api.get('/api/blogs').expect(404)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
