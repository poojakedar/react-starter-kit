/**
 * useAuth.js — Convenience hook for the AuthContext
 *
 * A thin wrapper so consumers import from '@/hooks/useAuth' instead of
 * having to know where AuthContext lives. This keeps the import surface
 * stable even if we restructure features later.
 *
 * Usage:
 *   import { useAuth } from '@/hooks/useAuth'
 *   const { user, login, logout, isAuthenticated, isLoading } = useAuth()
 */
export { useAuthContext as useAuth } from '@/features/auth/AuthContext'
