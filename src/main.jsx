/**
 * main.jsx — Application entry point
 *
 * Bootstraps the React app with StrictMode (catches potential issues during
 * development) and BrowserRouter (client-side routing via react-router-dom).
 */
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)
