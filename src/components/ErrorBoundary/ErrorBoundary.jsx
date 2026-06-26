/**
 * ErrorBoundary.jsx — React class-based error boundary
 *
 * Catches JavaScript errors anywhere in its child component tree,
 * logs the error, and renders a fallback UI instead of crashing the app.
 *
 * Usage:
 *   <ErrorBoundary>
 *     <SomeFeature />
 *   </ErrorBoundary>
 *
 *   // Or with a custom fallback:
 *   <ErrorBoundary fallback={<p>Something went wrong</p>}>
 *     <SomeFeature />
 *   </ErrorBoundary>
 *
 * Note: Error boundaries must be class components (React limitation).
 */
import { Component } from 'react'
import styles from './ErrorBoundary.module.css'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render shows the fallback UI
    return { hasError: true, error }
  }

  componentDidCatch(error, info) {
    // In production replace this with your error reporting service
    // e.g. Sentry.captureException(error, { extra: info })
    console.error('ErrorBoundary caught an error:', error, info.componentStack)
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null })
  }

  render() {
    const { hasError, error } = this.state
    const { children, fallback } = this.props

    if (!hasError) return children

    // Use a custom fallback if provided
    if (fallback) return fallback

    return (
      <div className={styles.wrapper} role="alert">
        <h2 className={styles.title}>Something went wrong</h2>
        <p className={styles.detail}>{error?.message || 'An unexpected error occurred.'}</p>
        <button className={styles.retry} onClick={this.handleReset}>
          Try again
        </button>
      </div>
    )
  }
}

export default ErrorBoundary
