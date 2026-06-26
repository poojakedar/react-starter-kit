/**
 * Header.jsx — Site-wide navigation header
 *
 * Uses NavLink from react-router-dom so the active route automatically
 * receives an "active" class (styled below via CSS Modules).
 */
import { NavLink } from 'react-router-dom'
import styles from './Header.module.css'

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
]

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        {/* Brand / logo */}
        <NavLink to="/" className={styles.brand} aria-label="Go to homepage">
          ⚛ React Starter Kit
        </NavLink>

        {/* Primary navigation */}
        <nav aria-label="Primary navigation">
          <ul className={styles.navList}>
            {NAV_LINKS.map(({ to, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end
                  className={({ isActive }) =>
                    [styles.navLink, isActive ? styles.active : ''].join(' ')
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header
