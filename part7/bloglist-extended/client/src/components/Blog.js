import { useDispatch, useSelector } from 'react-redux'
import { useMatch, useNavigate, Link } from 'react-router-dom'
import { updateBlog, removeBlog, addComment } from '../reducers/blogReducer'
import {
  Container,
  Box,
  Button,
  Grid,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Typography,
} from '@mui/material'

const Blog = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const blogs = useSelector((state) => state.blogs)
  const blogMatch = useMatch('/blogs/:id')
  const blog = blogMatch
    ? blogs.find((blog) => blog.id === blogMatch.params.id)
    : null

  const user = useSelector((state) => state.user)

  const handleLike = () => {
    dispatch(
      updateBlog({
        ...blog,
        likes: blog.likes + 1,
        user: blog.user.id,
      })
    )
  }

  const handleRemove = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      dispatch(removeBlog(blog))
      navigate('/')
    }
  }

  const handleComment = (event) => {
    event.preventDefault()
    const comment = event.target.comment.value
    event.target.comment.value = ''
    dispatch(addComment(blog.id, comment))
  }

  if (!blog) {
    return null
  }

  return (
    <Container>
      <h2 style={{ margin: '4rem 0 2rem', fontWeight: 'bold' }}>
        {blog.title} <i>by {blog.author}</i>
      </h2>
      <a href={blog.url}>{blog.url}</a>
      <Grid container sx={{ mt: 0.5 }}>
        <Grid item>
          <Typography component="h5" variant="h6" sx={{ mr: 1 }}>
            <b>{blog.likes}</b> likes
          </Typography>
        </Grid>
        <Grid item alignItems="stretch" style={{ display: 'flex' }}>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            size="small"
            onClick={handleLike}
          >
            like
          </Button>
        </Grid>
      </Grid>
      <Typography component="h5" variant="h6" sx={{ mb: 3 }}>
        added by <Link to={`/users/${blog.user.id}`}>{blog.user.name}</Link>
      </Typography>
      {user.username === blog.user.username ? (
        <Button
          variant="contained"
          color="error"
          size="small"
          onClick={handleRemove}
        >
          remove
        </Button>
      ) : null}
      <Typography
        component="h2"
        variant="h5"
        sx={{ mt: 5, mb: 2, fontWeight: 'bold' }}
      >
        comments ({blog.comments.length})
      </Typography>
      <Box component="form" noValidate onSubmit={handleComment}>
        <Grid container>
          <Grid item>
            <TextField
              label="write your thoughts here"
              name="comment"
              type="text"
              size="small"
            />
          </Grid>
          <Grid item alignItems="stretch" style={{ display: 'flex' }}>
            <Button
              variant="contained"
              size="small"
              color="primary"
              type="submit"
            >
              add comment
            </Button>
          </Grid>
        </Grid>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {blog.comments.map((comment, index) => (
              <TableRow key={index}>
                <TableCell>{comment}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  )
}

export default Blog
