const blogsRouter = require('express').Router()
const Blog = require('../models/blogs')
const { tokenExtractor } = require('../utils/middleware')

blogsRouter.use(tokenExtractor)

blogsRouter.get('/', async (request, response, next) => {
  console.log('Request headers:', request.headers)
  console.log('User:', request.user)
  try {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })

    if (blogs.length === 0) {
      response.status(404).end()
    } else {
      response.json(blogs.map((blog) => blog.toJSON()))
    }
  } catch (error) {
    next(error)
  }
})

blogsRouter.post('/', async (request, response, next) => {
  const blogData = request.body
  const user = request.user

  if (!blogData.title || !blogData.author || !blogData.url || !blogData.likes) {
    return response.status(400).json({ error: 'Missing required fields' })
  }

  try {
    const blog = new Blog({
      ...blogData,
      user: user._id,
    })

    const savedBlog = await blog.save()

    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)
  } catch (error) {
    next(error)
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {
  const id = request.params.id
  const user = request.user

  try {
    const blog = await Blog.findById(id)

    if (!blog) {
      return response.status(404).json({ error: 'Blog not found' })
    }

    if (blog.user.toString() !== user._id.toString()) {
      return response.status(401).json({ error: 'Unauthorized' })
    }

    await Blog.findByIdAndRemove(id)
    response.status(204).send('Deleted successfully')
  } catch (error) {
    next(error)
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  const id = request.params.id
  const updatedBlogData = request.body
  const user = request.user

  try {
    const blog = await Blog.findById(id)

    if (!blog) {
      return response.status(404).json({ error: 'Blog not found' })
    }

    if (blog.user.toString() !== user._id.toString()) {
      return response.status(401).json({ error: 'Unauthorized' })
    }

    const updatedBlog = await Blog.findByIdAndUpdate(id, updatedBlogData, {
      new: true,
    })

    response.json(updatedBlog)
  } catch (error) {
    next(error)
  }
})

module.exports = blogsRouter
