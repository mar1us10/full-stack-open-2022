const lodash = require('lodash')

const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.length === 0
    ? 0
    : blogs.reduce((sum, post) => sum + post.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null

  const favorite = blogs.reduce((prev, curr) => {
    return prev.likes > curr.likes ? prev : curr
  })

  return {
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes,
  }
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null

  const authorCount = lodash.countBy(blogs, 'author')

  const topAuthor = Object.keys(authorCount).reduce((a, b) => {
    return authorCount[a] > authorCount[b] ? a : b
  })

  return {
    author: topAuthor,
    blogs: authorCount[topAuthor],
  }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null

  const likesCount = lodash(blogs)
    .groupBy('author')
    .map((items, key) => ({
      author: key,
      likes: lodash.sumBy(items, 'likes'),
    }))
    .value()

  return likesCount.reduce((a, b) => {
    return a.likes > b.likes ? a : b
  })
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes }
