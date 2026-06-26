/**
 * useFetch.js — Generic data-fetching hook
 *
 * Wraps the apiService to provide loading / error / data state with
 * automatic fetch on mount and a manual refetch trigger.
 *
 * Usage:
 *   const { data, loading, error, refetch } = useFetch('/posts')
 */
import { useState, useEffect, useCallback } from 'react'
import { apiService } from '@/services/apiService'

/**
 * @param {string} endpoint  — relative URL path (e.g. '/posts')
 * @returns {{ data, loading, error, refetch }}
 */
export function useFetch(endpoint) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchData = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const result = await apiService.get(endpoint)
      setData(result)
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }, [endpoint])

  // Fetch once on mount (and whenever endpoint changes)
  useEffect(() => {
    fetchData()
  }, [fetchData])

  return { data, loading, error, refetch: fetchData }
}
