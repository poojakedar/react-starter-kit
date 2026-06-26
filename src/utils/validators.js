/**
 * validators.js — Common form / data validation helpers
 */

/**
 * Check whether a value is a valid email address.
 * @param {string} email
 * @returns {boolean}
 */
export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

/**
 * Check whether a string meets minimum password requirements:
 *   - At least 8 characters
 *   - At least one uppercase letter
 *   - At least one digit
 * @param {string} password
 * @returns {boolean}
 */
export function isStrongPassword(password) {
  return /^(?=.*[A-Z])(?=.*\d).{8,}$/.test(password)
}

/**
 * Check whether a value is neither null, undefined, nor an empty string.
 * @param {*} value
 * @returns {boolean}
 */
export function isRequired(value) {
  return value !== null && value !== undefined && String(value).trim() !== ''
}
