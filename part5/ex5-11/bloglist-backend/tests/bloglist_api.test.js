const mongoose = require('mongoose')
const supertest = require('supertest')

const app = require('../app')
const api = supertest(app)

const jwt = require('jsonwebtoken')

const Blog = require('../models/blogs')
const User = require('../models/users')

beforeEach(async () => {
  await Blog.deleteMany({})

  const user = await User.findOne({ username: 'usernameAlex' })
  const initialBlogs = [
    {
      title: 'Blog 1 New',
      author: 'Alex',
      url: 'http://1.com/',
      likes: 5,
      user: user._id,
    },
    {
      title: 'Blog 2 New',
      author: 'Alex',
      url: 'http://2.com/',
      likes: 10,
      user: user._id,
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
  let token
  let existingUser
  beforeEach(async () => {
    existingUser = await User.findOne({ username: 'usernameAlex' })
    token = jwt.sign({ id: existingUser._id }, process.env.SECRET)
  })

  test('creates a new blog post', async () => {
    const newBlog = {
      title: 'New Blog Post',
      author: 'Alex',
      url: 'http://...com',
      likes: 10,
    }

    const initialResponse = await api.get('/api/blogs')
    const initialBlogs = initialResponse.body

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
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
      title: 'New Blog',
      author: 'Alex',
      url: 'http://...com',
    }

    const response = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(response.body.error).toContain('Missing required fields')
  })
  test('returns 400 Bad Request if title is missing', async () => {
    const newBlog = {
      author: 'Alex',
      url: 'http://...com',
      likes: 10,
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(400)
  })

  test('returns 400 Bad Request if url is missing', async () => {
    const newBlog = {
      title: 'New Blog',
      author: 'Alex',
      likes: 10,
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(400)
  })
})

describe('DELETE /api/blogs', () => {
  let token
  let existingUser
  beforeEach(async () => {
    existingUser = await User.findOne({ username: 'usernameAlex' })
    token = jwt.sign({ id: existingUser._id }, process.env.SECRET)
  })

  test('deletes a blog post', async () => {
    const initialResponse = await api.get('/api/blogs')
    const initialBlogs = initialResponse.body

    if (initialBlogs.length === 0) {
      return
    }

    const blogToDelete = initialBlogs[0]
    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204)

    const response = await api.get('/api/blogs')
    const blogs = response.body

    expect(blogs).toHaveLength(initialBlogs.length - 1)
    expect(blogs.map((blog) => blog.id)).not.toContain(blogToDelete.id)
  })
})

describe('PUT /api/blogs', () => {
  let token
  let existingUser
  beforeEach(async () => {
    existingUser = await User.findOne({ username: 'usernameAlex' })
    token = jwt.sign({ id: existingUser._id }, process.env.SECRET)
  })

  test('updates a blog post', async () => {
    const initialResponse = await api.get('/api/blogs')
    const initialBlogs = initialResponse.body

    if (initialBlogs.length === 0) {
      return
    }

    const blogToUpdate = initialBlogs[0]
    const updatedData = {
      likes: blogToUpdate.likes + 1,
    }

    const response = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(updatedData)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body.likes).toBe(blogToUpdate.likes + 1)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
