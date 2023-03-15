const Notification = ({ notification }) => {
  const style = {
    marginBottom: 10,
  }

  return (
    notification ? <div style={style}>{notification}</div> : null
  )
}

export default Notification