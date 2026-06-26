/**
 * LoginPage.jsx — Login form
 *
 * Uses the useAuth hook to call login() and redirects on success.
 * Demonstrates form handling, loading states, and inline error display
 * without any external form library.
 */
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import Button from '@/components/Button/Button'
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage'
import styles from './LoginPage.module.css'
import { ROUTES } from '@/utils/constants'

function LoginPage() {
  const { login, isLoading } = useAuth()
  const navigate = useNavigate()

  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    setSubmitting(true)
    try {
      await login(form)
      navigate(ROUTES.HOME)
    } catch (err) {
      // AppError from apiService gives us a structured message
      setError(err)
    } finally {
      setSubmitting(false)
    }
  }

  if (isLoading) return null // session restore in progress — don't flash the login form

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Sign in</h1>

        {error && <ErrorMessage error={error} />}

        <form onSubmit={handleSubmit} noValidate>
          <div className={styles.field}>
            <label htmlFor="email" className={styles.label}>
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={form.email}
              onChange={handleChange}
              className={styles.input}
              placeholder="you@example.com"
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="password" className={styles.label}>
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={form.password}
              onChange={handleChange}
              className={styles.input}
              placeholder="••••••••"
            />
          </div>

          <Button type="submit" disabled={submitting} size="lg" style={{ width: '100%' }}>
            {submitting ? 'Signing in…' : 'Sign in'}
          </Button>
        </form>

        {/* Demo credentials — remove this block when connecting a real backend */}
        <div className={styles.demoBox}>
          <p className={styles.demoTitle}>Demo credentials</p>
          <div className={styles.demoRow}>
            <button
              type="button"
              className={styles.demoBtn}
              onClick={() => setForm({ email: 'demo@example.com', password: 'password123' })}
            >
              Admin — demo@example.com
            </button>
            <button
              type="button"
              className={styles.demoBtn}
              onClick={() => setForm({ email: 'jane@example.com', password: 'password123' })}
            >
              Viewer — jane@example.com
            </button>
          </div>
          <p className={styles.demoNote}>
            Password for both accounts: <code>password123</code>
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
