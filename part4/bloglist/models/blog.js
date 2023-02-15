const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  likes: {
    type: Number,
    required: true,
    default: 0,
  },
})

blogSchema.set('toJSON', {
  transform: (_document, returnedObj) => {
    returnedObj.id = returnedObj._id.toString()
    delete returnedObj._id
    delete returnedObj.__v
  },
})

module.exports = mongoose.model('Blog', blogSchema)
