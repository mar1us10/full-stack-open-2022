import React from 'react'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom/client'
import store from './store'
import App from './App'
import CssBaseline from '@mui/material/CssBaseline'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.Fragment>
      <CssBaseline />
      <App />
    </React.Fragment>
  </Provider>
)
