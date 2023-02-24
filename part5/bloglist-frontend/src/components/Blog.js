import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, user, updateBlog, removeBlog }) => {
  const [visible, setVisible] = useState(false)

  const handleLike = () => {
    updateBlog({
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id
    })
  }

  return (
    <div className="blog">
      <div>
        <span className="title" style={{ fontWeight: 'bold' }}>{blog.title}</span>{' '}
        <span className="author" style={{ fontStyle: 'italic' }}>{blog.author ? `${blog.author}` : null}</span>{' '}
        <button onClick={() => { setVisible(!visible) }}>
          {visible ? 'hide' : 'view'}
        </button>
      </div>
      {visible &&
        (<div>
          <a href={blog.url}>{blog.url}</a>
          <div> likes {blog.likes}{' '} <button onClick={handleLike}>like</button></div>
          <div>{blog.user.name}</div>
          {user.username === blog.user.username ?
            <button id="remove-btn" onClick={() => { removeBlog(blog) }}>remove</button> :
            null
          }
        </div>)
      }
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  updateBlog: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired
}

export default Blog