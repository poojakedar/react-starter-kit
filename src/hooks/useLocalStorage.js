/**
 * useLocalStorage.js — Persist state to localStorage
 *
 * A drop-in replacement for useState that syncs the value to localStorage
 * so it survives page refreshes.
 *
 * Usage:
 *   const [theme, setTheme] = useLocalStorage('theme', 'light')
 */
import { useState } from 'react'

/**
 * @param {string} key          — localStorage key
 * @param {*}      initialValue — default value when key is absent
 */
export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item !== null ? JSON.parse(item) : initialValue
    } catch {
      // Silently fall back to the initial value if storage is unavailable
      return initialValue
    }
  })

  const setValue = (value) => {
    try {
      // Accept a functional updater just like useState
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.error(`useLocalStorage: could not save key "${key}"`, error)
    }
  }

  return [storedValue, setValue]
}
