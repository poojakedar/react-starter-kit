/**
 * Header.jsx — Site-wide navigation header
 *
 * Uses NavLink from react-router-dom so the active route automatically
 * receives an "active" class (styled below via CSS Modules).
 * Shows a Dashboard link only when the user is authenticated.
 * Includes a light/dark theme toggle button driven by AppContext.
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

/* ── SVG icons ───────────────────────────────────────────── */
function SunIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  )
}

function Header() {
  const { isAuthenticated } = useAuth()
  const { theme, toggleTheme } = useApp()
  const isDark = theme === 'dark'

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
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            <span className={[styles.toggleTrack, isDark ? styles.dark : ''].join(' ')}>
              <span className={styles.toggleThumb} />
              <span className={styles.toggleIcon}>{isDark ? <SunIcon /> : <MoonIcon />}</span>
            </span>
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
