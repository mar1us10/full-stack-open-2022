import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { initializeLogin } from './reducers/loginReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/userReducer'
import Notification from './components/Notification'
import BlogList from './components/BlogList'
import UserList from './components/UserList'
import Navigation from './components/Navigation'
import LoginForm from './components/LoginForm'
import Blog from './components/Blog'
import User from './components/User'
import { Container } from '@mui/material'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  useEffect(() => {
    dispatch(initializeLogin())
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [dispatch])

  if (!user) {
    return (
      <Container>
        <LoginForm />
      </Container>
    )
  }

  return (
    <Container component="main">
      <BrowserRouter>
        <Notification />
        <Navigation />
        <Routes>
          <Route path="/" element={<BlogList />} />
          <Route path="/blogs/:id" element={<Blog />} />
          <Route path="/users/:id" element={<User />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/blogs" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </Container>
  )
}

export default App
