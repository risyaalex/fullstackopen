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

blogsRouter.delete('/:id', async (request, response, next) => {
  const id = request.params.id

  try {
    await Blog.findByIdAndRemove(id)
    response.status(204).end()
  } catch (error) {
    next(error)
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  const id = request.params.id
  const updatedBlogData = request.body

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(id, updatedBlogData, {
      new: true,
    })

    if (!updatedBlog) {
      return response.status(404).json({ error: 'Blog not found' })
    }

    response.json(updatedBlog)
  } catch (error) {
    next(error)
  }
})

module.exports = blogsRouter
