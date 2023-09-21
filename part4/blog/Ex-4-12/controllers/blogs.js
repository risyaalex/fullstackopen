const blogsRouter = require('express').Router()
const Blog = require('../models/blogs')

blogsRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({})
    if (blogs.length === 0) {
      response.status(404).end()
    } else {
      response.json(blogs)
    }
  } catch (error) {
    next(error)
  }
})

blogsRouter.post('/', async (request, response, next) => {
  const blogData = request.body

  if (!blogData.title || !blogData.author || !blogData.url || !blogData.likes) {
    return response.status(400).json({ error: 'Missing required fields' })
  }

  try {
    const blog = new Blog(blogData)
    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
  } catch (error) {
    next(error)
  }
})

module.exports = blogsRouter
