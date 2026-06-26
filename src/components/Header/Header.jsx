/**
 * Header.jsx — Site-wide navigation header
 *
 * Uses NavLink from react-router-dom so the active route automatically
 * receives an "active" class (styled below via CSS Modules).
 * Shows a Dashboard link only when the user is authenticated.
 */
import { NavLink } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { useApp } from '@/context/AppContext'
import { ROUTES } from '@/utils/constants'
import styles from './Header.module.css'

const PUBLIC_NAV = [
  { to: ROUTES.HOME, label: 'Home' },
  { to: ROUTES.ABOUT, label: 'About' },
]

function Header() {
  const { isAuthenticated } = useAuth()
  const { theme, toggleTheme } = useApp()

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        {/* Brand / logo */}
        <NavLink to={ROUTES.HOME} className={styles.brand} aria-label="Go to homepage">
          ⚛ React Starter Kit
        </NavLink>

        <div className={styles.right}>
          {/* Primary navigation */}
          <nav aria-label="Primary navigation">
            <ul className={styles.navList}>
              {PUBLIC_NAV.map(({ to, label }) => (
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

              {/* Dashboard only visible when signed in */}
              {isAuthenticated && (
                <li>
                  <NavLink
                    to={ROUTES.DASHBOARD}
                    className={({ isActive }) =>
                      [styles.navLink, isActive ? styles.active : ''].join(' ')
                    }
                  >
                    Dashboard
                  </NavLink>
                </li>
              )}

              {!isAuthenticated && (
                <li>
                  <NavLink
                    to={ROUTES.LOGIN}
                    className={({ isActive }) =>
                      [styles.navLink, isActive ? styles.active : ''].join(' ')
                    }
                  >
                    Sign in
                  </NavLink>
                </li>
              )}
            </ul>
          </nav>

          {/* Theme toggle */}
          <button
            className={styles.themeToggle}
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
