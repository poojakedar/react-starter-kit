/**
 * useFetch.js — Generic data-fetching hook
 *
 * Wraps the apiService to provide loading / error / data state with:
 *   - Automatic fetch on mount (and on endpoint change)
 *   - AbortController: cancels in-flight requests on unmount to prevent
 *     "setState on unmounted component" warnings
 *   - Structured AppError objects so callers can inspect status codes
 *   - Manual refetch trigger
 *
 * Usage:
 *   const { data, loading, error, refetch } = useFetch('/posts')
 */
import { useState, useEffect, useCallback, useRef } from 'react'
import { apiService } from '@/services/apiService'

/**
 * @param {string} endpoint  — relative URL path (e.g. '/posts')
 * @returns {{ data, loading, error, refetch }}
 */
export function useFetch(endpoint) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Track whether the component is still mounted to avoid stale state updates
  const isMounted = useRef(true)
  const abortControllerRef = useRef(null)

  const fetchData = useCallback(async () => {
    // Cancel any previous in-flight request before starting a new one
    abortControllerRef.current?.abort()
    const controller = new AbortController()
    abortControllerRef.current = controller

    if (isMounted.current) {
      setLoading(true)
      setError(null)
    }

    try {
      const result = await apiService.get(endpoint, { signal: controller.signal })
      if (isMounted.current) setData(result)
    } catch (err) {
      // Ignore errors caused by intentional abort (component unmounted)
      if (err.name === 'CanceledError' || err.name === 'AbortError') return
      if (isMounted.current) setError(err)
    } finally {
      if (isMounted.current) setLoading(false)
    }
  }, [endpoint])

  // Fetch once on mount; cancel on unmount
  useEffect(() => {
    isMounted.current = true
    fetchData()
    return () => {
      isMounted.current = false
      abortControllerRef.current?.abort()
    }
  }, [fetchData])

  return { data, loading, error, refetch: fetchData }
}
