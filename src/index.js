import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

// This code is required to start the mock API
if (window.location.hostname === 'localhost') {
  const {worker} = require('./mocks/browser')
  worker.start({
    onUnhandledRequest: 'bypass',
  })
}

// Note: The Router from react-router-dom v5 is inside the App component.
// We just need to render the App component here.
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
)