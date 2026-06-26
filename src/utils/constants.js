/**
 * constants.js — Application-wide constants
 *
 * Centralise magic strings and numbers here so they are easy to find and
 * update without hunting through the entire codebase.
 */

/** Application name — sourced from env or a sensible default */
export const APP_NAME = import.meta.env.VITE_APP_NAME || 'React Starter Kit'

/** API base URL — consumed by apiService.js */
export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'https://jsonplaceholder.typicode.com'

/** localStorage key for auth token */
export const AUTH_TOKEN_KEY = 'authToken'

/** Pagination defaults */
export const DEFAULT_PAGE_SIZE = 10
export const MAX_PAGE_SIZE = 100

/**
 * ROUTES — Centralised route path definitions.
 *
 * Always import from here instead of hard-coding path strings in components.
 * Renaming a route means updating only this file.
 */
export const ROUTES = {
  HOME: '/',
  ABOUT: 'about',
  LOGIN: 'login',
  REGISTER: 'register',
  DASHBOARD: 'dashboard',
}
