/**
 * main.jsx — Application entry point
 *
 * Provider hierarchy (outermost → innermost):
 *   BrowserRouter   — client-side routing
 *   AppProvider     — global theme / app-wide state
 *   AuthProvider    — authentication state (restores session on mount)
 *   ToastProvider   — app-wide toast notifications + ToastContainer
 *
 * Keep providers ordered so inner providers can consume outer ones if needed
 * (e.g. AuthProvider could call showToast on session expiry).
 */
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AppProvider } from '@/context/AppContext'
import { AuthProvider } from '@/features/auth/AuthContext'
import { ToastProvider } from '@/context/ToastContext'
import App from './App'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AppProvider>
        <AuthProvider>
          <ToastProvider>
            <App />
          </ToastProvider>
        </AuthProvider>
      </AppProvider>
    </BrowserRouter>
  </StrictMode>
)
