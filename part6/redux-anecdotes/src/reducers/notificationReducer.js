import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
        addNotification(_, action) {
            return action.payload
        },
        removeNotification(state, action) {
            return null
        }
    }
})

export const { addNotification } = notificationSlice.actions

export const setNotification = (message, timeout) => {
  return async dispatch => {
    dispatch(addNotification(message))
    setTimeout(() => {
      dispatch(addNotification(''))
    }, timeout * 1000);
  }
}

export default notificationSlice.reducer