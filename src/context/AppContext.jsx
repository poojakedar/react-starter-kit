/**
 * AppContext.jsx — Global application state
 *
 * Manages app-wide concerns that don't belong to a single feature:
 *   - theme ('light' | 'dark') — persisted in localStorage
 *
 * Add more global slices here as needed (e.g. locale, feature flags).
 *
 * Usage:
 *   import { useApp } from '@/context/AppContext'
 *   const { theme, toggleTheme } = useApp()
 */
import { createContext, useContext } from 'react'
import { useLocalStorage } from '@/hooks/useLocalStorage'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  // Detect OS preference as the default if no preference is stored
  const prefersDark =
    typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches

  const [theme, setTheme] = useLocalStorage('app-theme', prefersDark ? 'dark' : 'light')

  function toggleTheme() {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  // Apply the theme class to <html> so CSS variables cascade everywhere
  if (typeof document !== 'undefined') {
    document.documentElement.setAttribute('data-theme', theme)
  }

  const value = { theme, toggleTheme }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

/** useApp — consume AppContext. Throws if used outside <AppProvider>. */
export function useApp() {
  const context = useContext(AppContext)
  if (!context) throw new Error('useApp must be used inside <AppProvider>')
  return context
}
