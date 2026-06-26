/**
 * postsService.js — Posts API calls
 *
 * All API interactions for the "posts" domain live here.
 * Components and hooks import from this file; they never call apiService directly.
 */
import { apiService } from '@/services/apiService'

export const postsService = {
  /** Fetch a paginated list of posts. */
  getAll: ({ page = 1, limit = 10 } = {}) => apiService.get(`/posts?_page=${page}&_limit=${limit}`),

  /** Fetch a single post by id. */
  getById: (id) => apiService.get(`/posts/${id}`),

  /** Create a new post. */
  create: (payload) => apiService.post('/posts', payload),

  /** Update an existing post. */
  update: (id, payload) => apiService.put(`/posts/${id}`, payload),

  /** Delete a post. */
  remove: (id) => apiService.del(`/posts/${id}`),
}
