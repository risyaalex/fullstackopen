const bcrypt = require('bcryptjs')
const usersRouter = require('express').Router()
const User = require('../models/users')

usersRouter.post('/', async (request, response, next) => {
  const { username, name, password } = request.body

  if (!username || username.length < 3) {
    return response
      .status(400)
      .json({ error: 'Username must be at least 3 characters long' })
  }

  if (!password || password.length < 3) {
    return response
      .status(400)
      .json({ error: 'Password must be at least 3 characters long' })
  }

  try {
    const existingUser = await User.findOne({ username })
    if (existingUser) {
      const error = new Error('Username must be unique')
      error.statusCode = 400
      return next(error)
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)
    const user = new User({
      username,
      name,
      passwordHash,
    })
    const savedUser = await user.save()
    response.status(201).json(savedUser)
  } catch (error) {
    next(error)
  }
})

usersRouter.get('/', async (request, response, next) => {
  try {
    const users = await User.find({})
    if (users.length === 0) {
      response.status(404).end()
    } else {
      response.json(users)
    }
  } catch (error) {
    next(error)
  }
})

module.exports = usersRouter
