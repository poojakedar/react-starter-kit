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
 *   - Structured AppError: every rejection carries { status, userMessage, originalError }
 *     so UI components can display meaningful messages without parsing raw Axios errors
 *   - Named methods: get, post, put, patch, del
 */
import axios from 'axios'
import { AUTH_TOKEN_KEY } from '@/utils/constants'

// Vite exposes env variables on import.meta.env (prefix VITE_ required)
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://jsonplaceholder.typicode.com'

/* ── AppError ─────────────────────────────────────────────────────────────
 * A normalised error class thrown by the response interceptor.
 * Every component / hook receives this shape instead of raw Axios errors.
 * ─────────────────────────────────────────────────────────────────────── */
export class AppError extends Error {
  /**
   * @param {string}  message        — technical message (for logging)
   * @param {number|null} status     — HTTP status code (null for network errors)
   * @param {string}  userMessage    — human-readable message safe to show in UI
   * @param {Error}   originalError  — the original Axios error for debugging
   */
  constructor(message, status, userMessage, originalError) {
    super(message)
    this.name = 'AppError'
    this.status = status
    this.userMessage = userMessage
    this.originalError = originalError
  }
}

/** Map HTTP status codes to user-friendly messages. */
function getUserMessage(status) {
  const messages = {
    400: 'The request was invalid. Please check your input and try again.',
    401: 'Your session has expired. Please sign in again.',
    403: 'You do not have permission to perform this action.',
    404: 'The requested resource was not found.',
    408: 'The request timed out. Please check your connection.',
    422: 'The submitted data was invalid.',
    429: 'Too many requests. Please wait a moment and try again.',
    500: 'A server error occurred. Please try again later.',
    502: 'The server is temporarily unavailable. Please try again later.',
    503: 'The service is currently unavailable. Please try again later.',
  }
  return messages[status] || 'An unexpected error occurred. Please try again.'
}

/* ── Axios client ─────────────────────────────────────────────────────── */
const client = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 10_000, // 10 s — prevents hanging requests
})

/* ── Request interceptor ─────────────────────────────────────────────── */
client.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

/* ── Response interceptor ────────────────────────────────────────────── */
client.interceptors.response.use(
  // Unwrap Axios wrapper — callers receive plain data, not a Response object
  (response) => response.data,

  (error) => {
    // Abort/cancel — re-throw as-is so useFetch can ignore it
    if (axios.isCancel(error)) return Promise.reject(error)

    const status = error.response?.status ?? null

    if (status === 401) {
      // Clear stale token; let ProtectedRoute redirect to /login
      localStorage.removeItem(AUTH_TOKEN_KEY)
      window.location.href = '/login'
    }

    const serverMessage =
      error.response?.data?.message || error.response?.data?.error || error.message

    const appError = new AppError(serverMessage, status, getUserMessage(status), error)

    return Promise.reject(appError)
  }
)

/* ── Public API ──────────────────────────────────────────────────────── */
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
