/**
 * useDebounce.js — Debounce a rapidly-changing value
 *
 * Useful for delaying search queries / API calls until the user stops typing.
 *
 * Usage:
 *   const debouncedSearch = useDebounce(searchQuery, 400)
 */
import { useState, useEffect } from 'react'

/**
 * @param {*}      value — the value to debounce
 * @param {number} delay — milliseconds to wait after the last change
 * @returns the debounced value
 */
export function useDebounce(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay)
    // Clean up the timer when value or delay changes before it fires
    return () => clearTimeout(timer)
  }, [value, delay])

  return debouncedValue
}
