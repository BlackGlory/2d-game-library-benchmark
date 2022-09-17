import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './app'
import './index.css'

const container = document.querySelector('main')!
const root = ReactDOM.createRoot(container)
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)