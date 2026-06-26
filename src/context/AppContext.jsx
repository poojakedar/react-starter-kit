/**
 * AppContext.jsx — Global application state
 *
 * Manages app-wide concerns that don't belong to a single feature:
 *   - theme ('light' | 'dark') — persisted in localStorage, respects OS
 *     preference on first visit, and drives [data-theme] on <html>.
 *
 * Usage:
 *   import { useApp } from '@/context/AppContext'
 *   const { theme, toggleTheme } = useApp()
 */
import { createContext, useContext, useEffect } from 'react'
import { useLocalStorage } from '@/hooks/useLocalStorage'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  // Seed from OS preference on first visit; persist choice to localStorage
  const prefersDark =
    typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches

  const [theme, setTheme] = useLocalStorage('app-theme', prefersDark ? 'dark' : 'light')

  // Apply [data-theme] to <html> so every CSS rule that uses the attribute
  // updates instantly. Running in useEffect avoids mutating the DOM during render.
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  function toggleTheme() {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  return <AppContext.Provider value={{ theme, toggleTheme }}>{children}</AppContext.Provider>
}

/** useApp — consume AppContext. Throws if used outside <AppProvider>. */
export function useApp() {
  const context = useContext(AppContext)
  if (!context) throw new Error('useApp must be used inside <AppProvider>')
  return context
}
