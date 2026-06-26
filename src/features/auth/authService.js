/**
 * authService.js — Auth API stubs
 *
 * These are no-op stubs kept for structural consistency.
 * Authentication is handled entirely inside AuthContext.jsx using the
 * mock flow. Swap these stubs for real API calls when you connect a backend:
 *
 *   login:    POST /auth/login   → { user, token }
 *   logout:   POST /auth/logout
 *   getMe:    GET  /auth/me      → user
 *   register: POST /auth/register → { user, token }
 */
import { apiService } from '@/services/apiService'

export const authService = {
  login: (credentials) => apiService.post('/auth/login', credentials),
  logout: () => apiService.post('/auth/logout'),
  getMe: () => apiService.get('/auth/me'),
  register: (payload) => apiService.post('/auth/register', payload),
}
