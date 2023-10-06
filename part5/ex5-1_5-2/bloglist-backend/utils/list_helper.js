const _ = require('lodash')

const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  const maxLikes = Math.max(...blogs.map((blog) => blog.likes))
  return blogs.find((blog) => blog.likes === maxLikes)
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  const groupedBlogs = _.groupBy(blogs, 'author')
  const blogsByAuthors = _.mapValues(groupedBlogs, (e) => e.length)
  const maxBlogs = _.maxBy(_.entries(blogsByAuthors), ([, value]) => value)
  const [author, blogsCount] = maxBlogs

  return {
    author,
    blogs: blogsCount,
  }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  const likesByAuthor = _.groupBy(blogs, 'author')
  const authorsWithLikes = _.mapValues(likesByAuthor, (blogs) =>
    _.sumBy(blogs, 'likes')
  )
  const maxLikesAuthor = _.maxBy(
    _.entries(authorsWithLikes),
    ([, likes]) => likes
  )
  const [author, likes] = maxLikesAuthor

  return {
    author,
    likes,
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
