import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import BlogForm from './BlogForm'
import {
  Container,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from '@mui/material'

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs)

  return (
    <Container>
      <h2
        style={{
          margin: '4rem 0 2rem',
          fontWeight: 'bold',
        }}
      >
        blogs
      </h2>
      <BlogForm />
      <TableContainer component={Paper}>
        <Table>
          <TableHead component="em">
            <TableRow>
              <TableCell sx={{ fontSize: '1rem' }}>title</TableCell>
              <TableCell sx={{ fontSize: '1rem' }}>author</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {[...blogs]
              .sort((a, b) => b.likes - a.likes)
              .map((blog) => (
                <TableRow key={blog.id}>
                  <TableCell sx={{ fontSize: '1rem' }}>
                    <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                  </TableCell>
                  <TableCell sx={{ fontSize: '1rem' }}>{blog.author}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  )
}

export default BlogList
