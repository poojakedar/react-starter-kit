/**
 * App.jsx — Root application component
 *
 * Route structure:
 *
 *   /                  → HomePage   (public)
 *   /about             → AboutPage  (public)
 *   /login             → LoginPage  (public, redirect home if already authed)
 *   /dashboard         → DashboardPage (protected — requires auth)
 *   *                  → NotFoundPage
 *
 * Protected routes are wrapped in <ProtectedRoute> which redirects
 * unauthenticated users to /login and preserves the intended destination.
 *
 * Each route subtree is wrapped in an <ErrorBoundary> so a crash in one
 * feature never brings down the entire application.
 */
import { Routes, Route } from 'react-router-dom'
import Layout from '@/components/Layout/Layout'
import ProtectedRoute from '@/components/ProtectedRoute/ProtectedRoute'
import ErrorBoundary from '@/components/ErrorBoundary/ErrorBoundary'
import HomePage from '@/pages/HomePage'
import AboutPage from '@/pages/AboutPage'
import NotFoundPage from '@/pages/NotFoundPage'
import DashboardPage from '@/pages/DashboardPage'
import LoginPage from '@/features/auth/LoginPage'
import { ROUTES } from '@/utils/constants'
import './App.css'

function App() {
  return (
    <ErrorBoundary>
      <Routes>
        {/* ── Public routes (shared Layout shell) ── */}
        <Route path={ROUTES.HOME} element={<Layout />}>
          <Route
            index
            element={
              <ErrorBoundary>
                <HomePage />
              </ErrorBoundary>
            }
          />
          <Route
            path={ROUTES.ABOUT}
            element={
              <ErrorBoundary>
                <AboutPage />
              </ErrorBoundary>
            }
          />
          <Route path={ROUTES.LOGIN} element={<LoginPage />} />

          {/* ── Protected routes — user must be authenticated ── */}
          <Route element={<ProtectedRoute />}>
            <Route
              path={ROUTES.DASHBOARD}
              element={
                <ErrorBoundary>
                  <DashboardPage />
                </ErrorBoundary>
              }
            />
          </Route>

          {/* ── 404 catch-all ── */}
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </ErrorBoundary>
  )
}

export default App
