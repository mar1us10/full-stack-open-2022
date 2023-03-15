import { useSelector } from 'react-redux'
import { useMatch, Link } from 'react-router-dom'
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

const User = () => {
  const users = useSelector((state) => state.users)
  const userMatch = useMatch('/users/:id')
  const user = userMatch
    ? users.find((user) => user.id === userMatch.params.id)
    : null

  if (!user) {
    return null
  }

  return (
    <Container>
      <h2 style={{ margin: '4rem 0 2rem', fontWeight: 'bold' }}>{user.name}</h2>
      <h4>added blogs</h4>
      {user.blogs.length === 0 ? (
        <p>the user has not added any blogs yet.</p>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead component="em">
              <TableRow>
                <TableCell sx={{ fontSize: '1rem' }}>title</TableCell>
                <TableCell sx={{ fontSize: '1rem' }}>author</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {user.blogs.map((blog) => (
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
      )}
    </Container>
  )
}

export default User
