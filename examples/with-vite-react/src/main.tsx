import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

// Polyfill needed for hardware wallet modules
import { Buffer } from 'buffer'
window.Buffer = Buffer

import App from './App'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
