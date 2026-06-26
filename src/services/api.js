/**
 * api.js — Minimal API client using the native fetch API
 *
 * A lightweight alternative to the full Axios-based apiService.js.
 * Use this for quick API calls where you don't need interceptors or the
 * AppError class. Use apiService.js when you need request/response
 * interceptors, automatic auth headers, or structured error handling.
 *
 * Features:
 *   - JSON request/response handling out of the box
 *   - Non-2xx responses throw an { status, message } error object
 *   - Auth token automatically attached from localStorage when present
 *   - Named exports: get, post, put, del
 *   - Pre-built domain helpers: users.*
 *
 * Usage:
 *   import { users } from '@/services/api'
 *   const allUsers = await users.getAll()
 *
 *   import { get } from '@/services/api'
 *   const post = await get('/posts/1')
 */
import { AUTH_TOKEN_KEY } from '@/utils/constants'

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://jsonplaceholder.typicode.com'

/* ── Core fetch wrapper ──────────────────────────────────────────────── */

/**
 * Build request headers, attaching the Bearer token when available.
 * @param {HeadersInit} [extra] — additional headers to merge
 */
function buildHeaders(extra = {}) {
  const headers = { 'Content-Type': 'application/json', ...extra }
  const token = localStorage.getItem(AUTH_TOKEN_KEY)
  if (token) headers.Authorization = `Bearer ${token}`
  return headers
}

/**
 * Core fetch helper. Throws a plain Error with `.status` for non-2xx responses
 * so callers and useFetch can display a meaningful message.
 *
 * @param {string}  path    — relative path, e.g. '/users'
 * @param {RequestInit} [options] — native fetch options
 */
async function request(path, options = {}) {
  const response = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: buildHeaders(options.headers),
  })

  if (!response.ok) {
    const err = new Error(`Request failed: ${response.status} ${response.statusText}`)
    err.status = response.status
    err.userMessage = getStatusMessage(response.status)
    throw err
  }

  // Return null for 204 No Content
  if (response.status === 204) return null

  return response.json()
}

/** Map common status codes to user-friendly strings. */
function getStatusMessage(status) {
  const map = {
    400: 'Bad request. Please check your input.',
    401: 'Unauthorised. Please sign in.',
    403: "You don't have permission for this action.",
    404: 'The requested resource was not found.',
    429: 'Too many requests. Please wait and try again.',
    500: 'Server error. Please try again later.',
  }
  return map[status] || 'An unexpected error occurred.'
}

/* ── Convenience methods ─────────────────────────────────────────────── */

export const get = (path, opts) => request(path, { method: 'GET', ...opts })
export const post = (path, body, opts) =>
  request(path, { method: 'POST', body: JSON.stringify(body), ...opts })
export const put = (path, body, opts) =>
  request(path, { method: 'PUT', body: JSON.stringify(body), ...opts })
export const del = (path, opts) => request(path, { method: 'DELETE', ...opts })

/* ── Domain-specific helpers ─────────────────────────────────────────── */

/**
 * users — helpers for the /users endpoint (JSONPlaceholder demo)
 *
 * Swap these paths for your own API routes.
 */
export const users = {
  /** Fetch all users. */
  getAll: () => get('/users'),

  /** Fetch a single user by id. */
  getById: (id) => get(`/users/${id}`),
}

/**
 * posts — helpers for the /posts endpoint (JSONPlaceholder demo)
 */
export const posts = {
  /** Fetch posts, optionally paginated. */
  getAll: ({ page = 1, limit = 10 } = {}) => get(`/posts?_page=${page}&_limit=${limit}`),

  /** Fetch a single post. */
  getById: (id) => get(`/posts/${id}`),
}
