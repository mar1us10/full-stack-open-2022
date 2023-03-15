import { useSelector } from 'react-redux'
import { Alert } from '@mui/material'

const Notification = () => {
  const notification = useSelector((state) => state.notification)

  if (!notification) {
    return null
  }

  const severity = notification.type === 'error' ? 'success' : notification.type

  return <Alert severity={severity}>{notification.message}</Alert>
}

export default Notification
