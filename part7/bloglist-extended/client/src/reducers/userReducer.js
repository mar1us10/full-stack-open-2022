import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/users'

const userReducer = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    setUsers(_, action) {
      return action.payload
    },
    addUserBlog(state, action) {
      const user = state.find((user) => user.id === action.payload.id)
      user.blogs = user.blogs.concat(action.payload.blog)
    },
    removeUserBlog(state, action) {
      const user = state.find((user) => user.id === action.payload.id)
      user.blogs = user.blogs.filter(
        (blog) => blog.id !== action.payload.blog.id
      )
    },
  },
})

export const { setUsers } = userReducer.actions

export const initializeUsers = () => {
  return async (dispatch) => {
    const users = await userService.getAll()
    dispatch(setUsers(users))
  }
}

export const addUserBlog = (blog) => {
  return async (dispatch) => {
    dispatch(userReducer.actions.addUserBlog({ id: blog.user.id, blog }))
  }
}

export const removeUserBlog = (blog) => {
  return async (dispatch) => {
    dispatch(userReducer.actions.removeUserBlog({ id: blog.user.id, blog }))
  }
}

export default userReducer.reducer
