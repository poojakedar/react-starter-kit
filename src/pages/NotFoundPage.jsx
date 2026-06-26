/**
 * NotFoundPage.jsx — 404 page
 *
 * Displayed when no route matches the current URL.
 */
import { Link } from 'react-router-dom'
import styles from './NotFoundPage.module.css'

function NotFoundPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.code}>404</h1>
      <p className={styles.message}>Page not found</p>
      <Link to="/" className={styles.link}>
        ← Back to Home
      </Link>
    </div>
  )
}

export default NotFoundPage
