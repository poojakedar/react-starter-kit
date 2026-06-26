/**
 * Footer.jsx — Site-wide footer
 */
import styles from './Footer.module.css'

function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <p className={styles.text}>© {year} React Starter Kit. Built with React &amp; Vite.</p>
    </footer>
  )
}

export default Footer
