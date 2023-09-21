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

blogsRouter.post('/', (request, response, next) => {
  const blogData = request.body

  if (!blogData.title || !blogData.author || !blogData.url || !blogData.likes) {
    const error = new Error('Missing required fields')
    error.status = 400
    return next(error)
  }

  const blog = new Blog(blogData)

  blog
    .save()
    .then((result) => {
      response.status(201).json(result)
    })
    .catch((error) => next(error))
})

module.exports = blogsRouter
