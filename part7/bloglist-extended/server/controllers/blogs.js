const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')

blogsRouter.get('/', async (_request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })

  if (blogs) {
    response.json(blogs)
  } else {
    response.status(404).end()
  }
})

blogsRouter.get('/:id', async (request, response) => {
  const idBlog = await Blog.findById(request.params.id)

  if (idBlog) {
    response.json(idBlog.toJSON())
  } else {
    response.status(404).end()
  }
})

blogsRouter.post('/', async (request, response) => {
  const token = request.token
  const decodedToken = jwt.verify(token, process.env.SECRET)

  if (token === null || !token || !decodedToken) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  try {
    const body = request.body
    const user = request.user

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user._id,
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    const addedUserBlog = await Blog.findById(savedBlog._id).populate('user', {
      username: 1,
      name: 1,
    })

    response.status(201).json(addedUserBlog)
  } catch (error) {
    response.status(400).end()
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  }
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
    runValidators: true,
    context: 'query',
  }).populate('user', { username: 1, name: 1 })

  if (updatedBlog) {
    response.json(updatedBlog.toJSON())
  } else {
    response.status(404).end()
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  const token = request.token
  const decodedToken = jwt.verify(token, process.env.SECRET)

  if (!decodedToken.id || !token || !decodedToken) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  try {
    const id = request.params.id
    const blog = await Blog.findById(id)
    const user = request.user
    if (blog.user.toString() === user.id.toString()) {
      await Blog.findByIdAndRemove(id)
      response.status(204).end()
    } else {
      return response.status(401).json({
        error: 'Unauthorized access, failed to remove',
      })
    }
  } catch (error) {
    response.status(400).end()
  }
})

blogsRouter.post('/:id/comments', async (request, response, next) => {
  if (!request.body.comment) {
    return response.status(400).json({ error: 'comment missing' })
  }
  try {
    const blog = await Blog.findById(request.params.id).populate('user', {
      username: 1,
      name: 1,
    })
    blog.comments = blog.comments.concat(request.body.comment)
    await blog.save()

    response.status(201).json(blog)
  } catch (error) {
    next(error)
  }
})

module.exports = blogsRouter
