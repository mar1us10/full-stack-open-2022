import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { Button, TextField, Container, Box, Typography } from '@mui/material'
import { login } from '../reducers/loginReducer'
import Notification from './Notification'

const Login = () => {
  const dispatch = useDispatch()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (event) => {
    event.preventDefault()
    dispatch(login({ username, password }))
    setUsername('')
    setPassword('')
  }

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          boxShadow: 3,
          borderRadius: 2,
          px: 4,
          py: 6,
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Log in to Bloglist
        </Typography>
        <Notification />
        <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Username"
            type="text"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            login
          </Button>
        </Box>
      </Box>
    </Container>
  )
}

export default Login
