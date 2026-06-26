/**
 * ErrorMessage.jsx — Inline error display component
 *
 * Renders a structured error message from an AppError (thrown by apiService)
 * or any Error / plain string. Optionally shows a Retry button.
 *
 * Props:
 *   error    — Error object, AppError, or string
 *   onRetry  — optional callback; renders a "Try again" button when provided
 *   compact  — reduces padding for inline (non-full-page) use
 */
import PropTypes from 'prop-types'
import styles from './ErrorMessage.module.css'

function ErrorMessage({ error, onRetry, compact = false }) {
  // Support Error objects, AppError objects, and plain strings
  const title = error?.status ? `Error ${error.status}` : 'Something went wrong'
  const message =
    typeof error === 'string'
      ? error
      : error?.userMessage || error?.message || 'An unexpected error occurred.'

  return (
    <div
      className={[styles.wrapper, compact ? styles.compact : ''].join(' ')}
      role="alert"
      aria-live="assertive"
    >
      <div className={styles.icon} aria-hidden="true">
        ⚠
      </div>
      <div className={styles.content}>
        <p className={styles.title}>{title}</p>
        <p className={styles.message}>{message}</p>
        {onRetry && (
          <button className={styles.retryBtn} onClick={onRetry}>
            Try again
          </button>
        )}
      </div>
    </div>
  )
}

ErrorMessage.propTypes = {
  error: PropTypes.oneOfType([PropTypes.instanceOf(Error), PropTypes.object, PropTypes.string])
    .isRequired,
  onRetry: PropTypes.func,
  compact: PropTypes.bool,
}

export default ErrorMessage
