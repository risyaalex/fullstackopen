const app = require('../app')
const supertest = require('supertest')
const mongoose = require('mongoose')
const Blog = require('../models/blogs')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})

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
})

describe('GET /api/blogs', () => {
  test('returns a JSON array of blogs', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body).toHaveLength(2)
  })

  test('returns 404 if no blogs are found', async () => {
    await Blog.deleteMany({})
    await api.get('/api/blogs').expect(404)
  })

  test('blog posts have id property', async () => {
    const response = await api.get('/api/blogs')
    const blogs = response.body

    expect(Array.isArray(blogs)).toBe(true)

    blogs.forEach((blog) => {
      expect(blog.id).toBeDefined()
    })
  })
})

describe('POST /api/blogs', () => {
  test('creates a new blog post', async () => {
    const newBlog = {
      title: 'New Blog Post',
      author: 'Author Name',
      url: 'http://example.com',
      likes: 10,
    }

    const initialResponse = await api.get('/api/blogs')
    const initialBlogs = initialResponse.body

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const blogs = response.body
    const titles = blogs.map((blog) => blog.title)

    expect(response.body).toHaveLength(initialBlogs.length + 1)
    expect(titles).toContain('New Blog Post')
  })

  test('creates a new blog post with default likes 0', async () => {
    const newBlog = {
      title: 'New Blog Post',
      author: 'Author Name',
      url: 'http://example.com',
    }

    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(response.body.error).toContain('Missing required fields')
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
