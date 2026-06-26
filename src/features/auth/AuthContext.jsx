/**
 * AuthContext.jsx — Mock authentication state
 *
 * A self-contained, backend-free auth implementation for development and
 * demos. Real credentials are validated against MOCK_USERS below.
 *
 * To connect a real backend later, replace the login / restoreSession logic
 * with actual API calls — the context shape and hook API stay identical.
 *
 * Provides:
 *   user            — authenticated user object, or null
 *   isAuthenticated — boolean shortcut
 *   isLoading       — true while restoring a saved session on first render
 *   login(credentials)  — validates mock credentials, persists session
 *   logout()            — clears session
 *
 * Usage:
 *   import { useAuthContext } from '@/features/auth/AuthContext'
 *   const { user, login, logout, isAuthenticated } = useAuthContext()
 */
import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { AUTH_TOKEN_KEY } from '@/utils/constants'

/* ── Mock user database ───────────────────────────────────────────────────
 * Add more users here to simulate multiple roles (admin, viewer, etc.)
 * Never ship real passwords in source code — this is demo-only.
 * ─────────────────────────────────────────────────────────────────────── */
const MOCK_USERS = [
  {
    id: 1,
    name: 'Demo User',
    email: 'demo@example.com',
    password: 'password123',
    role: 'admin',
    avatar: 'https://i.pravatar.cc/150?u=demo@example.com',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: 'password123',
    role: 'viewer',
    avatar: 'https://i.pravatar.cc/150?u=jane@example.com',
  },
]

/** Simulate network latency so the UI loading state is visible. */
const MOCK_DELAY_MS = 600

function mockDelay() {
  return new Promise((resolve) => setTimeout(resolve, MOCK_DELAY_MS))
}

/** Strip the password before storing / exposing the user object. */
function sanitiseUser({ password: _pw, ...safeUser }) {
  return safeUser
}

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  // On mount: restore a previously saved session from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(AUTH_TOKEN_KEY)
    if (saved) {
      try {
        setUser(JSON.parse(saved))
      } catch {
        localStorage.removeItem(AUTH_TOKEN_KEY)
      }
    }
    setIsLoading(false)
  }, [])

  /**
   * login({ email, password })
   * Validates credentials against MOCK_USERS.
   * Throws a plain Error with a user-friendly message on failure.
   */
  const login = useCallback(async ({ email, password }) => {
    await mockDelay()

    const match = MOCK_USERS.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    )

    if (!match) {
      const err = new Error('Invalid email or password.')
      err.userMessage = 'Invalid email or password. Check the demo credentials below.'
      throw err
    }

    const safeUser = sanitiseUser(match)
    localStorage.setItem(AUTH_TOKEN_KEY, JSON.stringify(safeUser))
    setUser(safeUser)
    return safeUser
  }, [])

  /** logout — clears the session immediately (no network call needed). */
  const logout = useCallback(() => {
    localStorage.removeItem(AUTH_TOKEN_KEY)
    setUser(null)
  }, [])

  const value = {
    user,
    isAuthenticated: Boolean(user),
    isLoading,
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

/** useAuthContext — consume AuthContext. Throws if used outside <AuthProvider>. */
export function useAuthContext() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuthContext must be used inside <AuthProvider>')
  return context
}
