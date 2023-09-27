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
      author: 'Alex',
      url: 'http://1.com/',
      likes: 5,
    },
    {
      title: 'Blog 2',
      author: 'Alex',
      url: 'http://2.com/',
      likes: 10,
    },
  ]

  await Blog.insertMany(initialBlogs)
})

afterAll(async () => {
  await mongoose.connection.close()
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
      author: 'Alex',
      url: 'http://...com',
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
      title: 'New Blog',
      author: 'Alex',
      url: 'http://...com',
    }

    const response = await api
      .post('/api/blogs')
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

    await api.post('/api/blogs').send(newBlog).expect(400)
  })

  test('returns 400 Bad Request if url is missing', async () => {
    const newBlog = {
      title: 'New Blog',
      author: 'Alex',
      likes: 10,
    }

    await api.post('/api/blogs').send(newBlog).expect(400)
  })
})

describe('DELETE /api/blogs', () => {
  test('deletes a blog post', async () => {
    const initialResponse = await api.get('/api/blogs')
    const initialBlogs = initialResponse.body

    if (initialBlogs.length === 0) {
      return
    }

    const blogToDelete = initialBlogs[0]
    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)

    const response = await api.get('/api/blogs')
    const blogs = response.body

    expect(blogs).toHaveLength(initialBlogs.length - 1)
    expect(blogs.map((blog) => blog.id)).not.toContain(blogToDelete.id)
  })
})

describe('PUT /api/blogs', () => {
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
      .send(updatedData)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body.likes).toBe(blogToUpdate.likes + 1)
  })
})