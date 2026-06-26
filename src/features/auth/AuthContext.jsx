/**
 * AuthContext.jsx — Authentication state for the whole application
 *
 * Provides:
 *   user        — the currently authenticated user object (or null)
 *   token       — the raw JWT string (or null)
 *   isAuthenticated — boolean shortcut
 *   login(credentials) — calls authService, stores token, sets user
 *   logout()    — clears token and user state
 *   isLoading   — true while the initial session is being restored
 *
 * Usage:
 *   import { useAuthContext } from '@/features/auth/AuthContext'
 *   const { user, login, logout } = useAuthContext()
 */
import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { authService } from './authService'
import { AUTH_TOKEN_KEY } from '@/utils/constants'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(() => localStorage.getItem(AUTH_TOKEN_KEY))
  const [isLoading, setIsLoading] = useState(true) // restoring session on mount

  // On mount: if a token exists, verify it with the server and restore the session
  useEffect(() => {
    async function restoreSession() {
      if (!token) {
        setIsLoading(false)
        return
      }
      try {
        const currentUser = await authService.getMe()
        setUser(currentUser)
      } catch {
        // Token is invalid or expired — clear it silently
        localStorage.removeItem(AUTH_TOKEN_KEY)
        setToken(null)
      } finally {
        setIsLoading(false)
      }
    }
    restoreSession()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  /** Log in with email/password credentials. */
  const login = useCallback(async (credentials) => {
    const { user: loggedInUser, token: newToken } = await authService.login(credentials)
    localStorage.setItem(AUTH_TOKEN_KEY, newToken)
    setToken(newToken)
    setUser(loggedInUser)
    return loggedInUser
  }, [])

  /** Log out: clear local state and server session. */
  const logout = useCallback(async () => {
    try {
      await authService.logout()
    } finally {
      localStorage.removeItem(AUTH_TOKEN_KEY)
      setToken(null)
      setUser(null)
    }
  }, [])

  const value = {
    user,
    token,
    isAuthenticated: Boolean(user),
    isLoading,
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

/**
 * useAuthContext — consume the AuthContext inside any component.
 * Throws if used outside <AuthProvider>.
 */
export function useAuthContext() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuthContext must be used inside <AuthProvider>')
  }
  return context
}
