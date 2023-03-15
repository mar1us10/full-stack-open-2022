import { createSlice } from '@reduxjs/toolkit'

const notificationReducer = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    createNotification(_, action) {
      return action.payload
    },
    removeNotification() {
      return null
    },
  },
})

export const { createNotification, removeNotification } =
  notificationReducer.actions

let notificationTimeout = null

export const setNotification = (message, type = 'success', time = 5) => {
  return async (dispatch) => {
    if (notificationTimeout) {
      clearTimeout(notificationTimeout)
    }

    dispatch(createNotification({ message, type }))

    notificationTimeout = setTimeout(() => {
      dispatch(removeNotification())
    }, time * 1000)
  }
}

export default notificationReducer.reducer
