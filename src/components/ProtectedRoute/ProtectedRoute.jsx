/**
 * ProtectedRoute.jsx — Route guard for authenticated pages
 *
 * Redirects unauthenticated users to /login while preserving the
 * intended destination so they are redirected back after sign-in.
 *
 * While the session is still being restored (isLoading === true) a
 * full-page Loader is shown to prevent a flash of the login screen.
 *
 * Usage (inside <Routes>):
 *   <Route element={<ProtectedRoute />}>
 *     <Route path="/dashboard" element={<Dashboard />} />
 *     <Route path="/settings"  element={<Settings />} />
 *   </Route>
 */
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import Loader from '@/components/Loader/Loader'
import { ROUTES } from '@/utils/constants'

function ProtectedRoute() {
  const { isAuthenticated, isLoading } = useAuth()
  const location = useLocation()

  // Session restore still in progress — don't redirect prematurely
  if (isLoading) return <Loader label="Verifying session…" />

  if (!isAuthenticated) {
    // Pass the attempted URL so we can redirect back after login
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />
  }

  return <Outlet />
}

export default ProtectedRoute
