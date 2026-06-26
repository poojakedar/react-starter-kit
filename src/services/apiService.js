/**
 * apiService.js — Centralised HTTP client
 *
 * Built on Axios. All requests are automatically prefixed with the base URL
 * read from the VITE_API_BASE_URL environment variable so you never
 * hard-code URLs in components or hooks.
 *
 * Features:
 *   - Request interceptor: attach auth token from localStorage if present
 *   - Response interceptor: unwrap response.data; handle 401 globally
 *   - Named methods: get, post, put, patch, del
 */
import axios from 'axios'

// Vite exposes env variables on import.meta.env (prefix VITE_ required)
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://jsonplaceholder.typicode.com'

const client = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10_000, // 10 s timeout to prevent hanging requests
})

/* ── Request interceptor ── */
client.interceptors.request.use(
  (config) => {
    // Attach Bearer token when the user is authenticated
    const token = localStorage.getItem('authToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

/* ── Response interceptor ── */
client.interceptors.response.use(
  // Unwrap Axios wrapper so callers receive plain data
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      // Clear stale credentials and redirect to login
      localStorage.removeItem('authToken')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export const apiService = {
  /** GET request */
  get: (url, config) => client.get(url, config),

  /** POST request */
  post: (url, data, config) => client.post(url, data, config),

  /** PUT request (full update) */
  put: (url, data, config) => client.put(url, data, config),

  /** PATCH request (partial update) */
  patch: (url, data, config) => client.patch(url, data, config),

  /** DELETE request */
  del: (url, config) => client.delete(url, config),
}
