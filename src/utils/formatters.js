/**
 * formatters.js — Common string / number / date formatting utilities
 */

/**
 * Truncate a string to `maxLength` characters and append an ellipsis.
 * @param {string} str
 * @param {number} maxLength
 * @returns {string}
 */
export function truncate(str, maxLength = 100) {
  if (!str || str.length <= maxLength) return str
  return `${str.slice(0, maxLength).trimEnd()}…`
}

/**
 * Capitalise the first letter of every word in a string.
 * @param {string} str
 * @returns {string}
 */
export function toTitleCase(str) {
  if (!str) return ''
  return str.replace(/\w\S*/g, (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
}

/**
 * Format a number as a localised currency string.
 * @param {number} amount
 * @param {string} currency — ISO 4217 code (default: 'USD')
 * @param {string} locale   — BCP 47 locale (default: 'en-US')
 * @returns {string}
 */
export function formatCurrency(amount, currency = 'USD', locale = 'en-US') {
  return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(amount)
}

/**
 * Format a Date object (or ISO string) as a human-readable date.
 * @param {Date|string} date
 * @param {Intl.DateTimeFormatOptions} options
 * @returns {string}
 */
export function formatDate(date, options = { year: 'numeric', month: 'long', day: 'numeric' }) {
  return new Intl.DateTimeFormat('en-US', options).format(new Date(date))
}
