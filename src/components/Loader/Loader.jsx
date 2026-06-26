/**
 * Loader.jsx — Full-page loading spinner
 *
 * Displayed while async data is being fetched. Accessible: uses
 * role="status" and a visually-hidden label for screen readers.
 */
import styles from './Loader.module.css'

function Loader({ label = 'Loading…' }) {
  return (
    <div className={styles.wrapper} role="status" aria-label={label}>
      <span className={styles.spinner} aria-hidden="true" />
      <span className={styles.srOnly}>{label}</span>
    </div>
  )
}

export default Loader
