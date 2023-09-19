require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')
const Blog = require('./models/notes')

app.use(cors())

app.use(express.json())

app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :POST')
)

morgan.token('POST', function (request) {
  return JSON.stringify(request.body)
})

app.get('/api/blogs', (request, response, next) => {
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

app.post('/api/blogs', (request, response, next) => {
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

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).send({ error: error.message })
  } else {
    console.error(error.message)
    next(error)
  }
}

app.use(errorHandler)

const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
