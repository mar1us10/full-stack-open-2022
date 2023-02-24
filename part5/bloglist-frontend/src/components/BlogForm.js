import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog} id='blog-form'>
        <div>
          title:
          <input
            id='title'
            type='text'
            value={title}
            name="Title"
            onChange={handleTitleChange}
            placeholder='title'
          />
        </div>
        <div>
          author:
          <input
            id='author'
            type='text'
            value={author}
            name='Author'
            onChange={handleAuthorChange}
            placeholder='author'
          />
        </div>
        <div>
          url:
          <input
            id='url'
            type='text'
            value={url}
            name='Url'
            onChange={handleUrlChange}
            placeholder='url'
          />
        </div>
        <button type='submit' id='submit-btn'>create</button>
      </form>
    </div>
  )
}

BlogForm.displayName = 'BlogForm'

export default BlogForm