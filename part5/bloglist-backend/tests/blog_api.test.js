const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

describe('when there are initially some blogs saved', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })

  test('identifier property of the blogs is named id instead of _id', async () => {
    const res = await api.get('/api/blogs')
    expect(res.body[0].id).toBeDefined()
    expect(res.body[0]._id).toBe(undefined)
  })
})

describe('addition of a new blog', () => {
  let token = null
  beforeAll(async () => {
    await User.deleteMany({})
    const user = await new User({
      username: 'User1',
      passwordHash: await bcrypt.hash('user1', 10),
    }).save()

    const log = { username: 'User1', id: user.id }
    token = jwt.sign(log, process.env.SECRET)
    return token
  })

  test('a valid blog can be added', async () => {
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(helper.testBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map((r) => r.title)
    expect(titles).toContain('Test Blog')
  })

  test('blog without likes will default value 0', async () => {
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(helper.blogWOLikes)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const likes = blogsAtEnd.map((r) => r.likes)
    expect(likes[likes.length - 1]).toBe(0)
  })

  test('blog without title and url is not added', async () => {
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(helper.blogWOTitlerUrl)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })
})

describe('delete a blog', () => {
  let token = null
  beforeEach(async () => {
    await User.deleteMany({})
    await Blog.deleteMany({})

    const user = await new User({
      username: 'User1',
      passwordHash: await bcrypt.hash('user1', 10),
    }).save()

    const log = { username: 'User1', id: user.id }
    token = jwt.sign(log, process.env.SECRET)

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(helper.testBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    return token
  })

  test('blog can be deleted', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(0)

    const titles = blogsAtEnd.map((r) => r.title)
    expect(titles).not.toContain(blogToDelete.titles)
  })
})

describe('update a blog', () => {
  let token = null
  beforeAll(async () => {
    await User.deleteMany({})
    const user = await new User({
      username: 'User1',
      passwordHash: await bcrypt.hash('user1', 10),
    }).save()

    const log = { username: 'User1', id: user.id }
    token = jwt.sign(log, process.env.SECRET)
    return token
  })

  test('blog likes can be updated', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ likes: 9 })
      .expect(200)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd[0]).toHaveProperty('likes', 9)
  })

  test('blog can be updated', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(helper.testBlog)
      .expect(200)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    expect(blogsAtEnd[0]).toEqual(expect.objectContaining(helper.testBlog))
  })
})

describe('when authorization token is not provided', () => {
  test('blog cannot be added, returns 401', async () => {
    await api
      .post('/api/blogs')
      .send(helper.testBlog)
      .expect(401)
  })

  test('blog cannot be deleted, returns 401', async () => {
    const id = (await api.get('/api/blogs')).body[0].id

    await api
      .delete(`/api/blogs/${id}`)
      .expect(401)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
