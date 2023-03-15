import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
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

const UserList = () => {
  const users = useSelector((state) => state.users)

  return (
    <Container>
      <h2 style={{ margin: '4rem 0 2rem', fontWeight: 'bold' }}>users</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead component="em">
            <TableRow>
              <TableCell sx={{ fontSize: '1rem' }}>user</TableCell>
              <TableCell sx={{ fontSize: '1rem' }}>blogs created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell sx={{ fontSize: '1rem' }}>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </TableCell>
                <TableCell sx={{ fontSize: '1rem' }}>
                  {user.blogs.length}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  )
}

export default UserList
