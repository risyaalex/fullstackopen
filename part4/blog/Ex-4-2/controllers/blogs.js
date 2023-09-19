const blogsRouter = require('express').Router()
const Blog = require('../models/blogs')

blogsRouter.get('/', (request, response, next) => {
  Blog.find({})
    .then((blogs) => {
      if (blogs) {
        response.json(blogs)
      } else {
        response.status(404).end()
      }
    })
    .catch((error) => next(error))
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
