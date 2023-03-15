import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../reducers/loginReducer'
import {
  Container,
  AppBar,
  Toolbar,
  Button,
  Box,
  Typography,
} from '@mui/material'

const Navigation = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  return (
    <Container>
      <Typography
        component="h1"
        variant="h4"
        sx={{ m: '1.3rem 0', color: 'primary.dark', fontWeight: 'bold' }}
      >
        Bloglist
      </Typography>
      <AppBar position="static">
        <Toolbar sx={{ bgcolor: 'primary.light' }}>
          <Button color="inherit" variant="standard" component={Link} to="/">
            home
          </Button>
          <Button
            color="inherit"
            variant="standard"
            component={Link}
            to="/users"
          >
            users
          </Button>
          <Box component="em" sx={{ ml: 'auto', mr: 2 }} color="inherit">
            {user.name} logged in
          </Box>
          <Button
            sx={{ bgcolor: 'warning.light' }}
            variant="outlined"
            color="inherit"
            onClick={() => dispatch(logout())}
          >
            log out
          </Button>
        </Toolbar>
      </AppBar>
    </Container>
  )
}

export default Navigation
