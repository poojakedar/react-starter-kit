/**
 * authService.js — Authentication API calls
 *
 * All endpoints hit /auth/* on your backend. Swap the paths for your own API.
 * The apiService Axios client automatically attaches the Bearer token from
 * localStorage, so only login/logout need special handling here.
 */
import { apiService } from '@/services/apiService'

export const authService = {
  /**
   * Authenticate with email + password.
   * @param {{ email: string, password: string }} credentials
   * @returns {{ user: object, token: string }}
   */
  login: (credentials) => apiService.post('/auth/login', credentials),

  /**
   * Invalidate the current session on the server.
   */
  logout: () => apiService.post('/auth/logout'),

  /**
   * Fetch the currently authenticated user's profile.
   * Used on app load to restore the session from a stored token.
   * @returns {object} user
   */
  getMe: () => apiService.get('/auth/me'),

  /**
   * Register a new account.
   * @param {{ name: string, email: string, password: string }} payload
   * @returns {{ user: object, token: string }}
   */
  register: (payload) => apiService.post('/auth/register', payload),
}
