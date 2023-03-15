import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { Button, TextField, Container, Box, Typography } from '@mui/material'

const BlogForm = () => {
  const dispatch = useDispatch()

  const [visibility, setVisibility] = useState(false)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = async (event) => {
    event.preventDefault()

    dispatch(
      createBlog({
        title,
        author,
        url,
      })
    )

    toggleVisibility()

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  const toggleVisibility = () => {
    setVisibility(!visibility)
  }

  const handleToggleVisibility = (event) => {
    event.preventDefault()
    toggleVisibility()
  }

  if (!visibility) {
    return (
      <div>
        <Button
          variant="contained"
          size="small"
          sx={{ mb: 1, ml: 2 }}
          onClick={handleToggleVisibility}
        >
          create new
        </Button>
      </div>
    )
  }

  return (
    <Container maxWidth="xl">
      <Box
        sx={{
          boxShadow: 3,
          borderRadius: 2,
          padding: 3,
          margin: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'left',
        }}
      >
        <Typography component="h1" variant="h5">
          Add a new blog
        </Typography>
        <Box component="form" onSubmit={addBlog} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Title"
            type="text"
            name="title"
            autoFocus
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Author"
            type="text"
            name="author"
            autoFocus
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Url"
            type="text"
            name="url"
            autoFocus
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />

          <Button
            type="submit"
            variant="contained"
            size="medium"
            sx={{ mt: 3, mb: 2 }}
          >
            create
          </Button>
          <Button
            type="submit"
            variant="outlined"
            color="error"
            size="medium"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleToggleVisibility}
          >
            cancel
          </Button>
        </Box>
      </Box>
    </Container>
  )
}

export default BlogForm
