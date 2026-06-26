/**
 * ToastContext.jsx — App-wide toast notification system
 *
 * Provides:
 *   showToast({ message, type }) — queue a notification ('success'|'error'|'info'|'warning')
 *   toasts                       — array of active toasts (consumed by ToastContainer)
 *   dismissToast(id)             — manually remove a toast
 *
 * Toasts auto-dismiss after `TOAST_DURATION` ms by default.
 *
 * Usage:
 *   import { useToast } from '@/context/ToastContext'
 *   const { showToast } = useToast()
 *   showToast({ message: 'Saved!', type: 'success' })
 */
import { createContext, useContext, useState, useCallback } from 'react'

const TOAST_DURATION = 4000 // ms

const ToastContext = createContext(null)

let nextId = 1

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const dismissToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const showToast = useCallback(
    ({ message, type = 'info', duration = TOAST_DURATION }) => {
      const id = nextId++
      setToasts((prev) => [...prev, { id, message, type }])
      // Auto-dismiss after `duration` ms
      setTimeout(() => dismissToast(id), duration)
      return id
    },
    [dismissToast]
  )

  return (
    <ToastContext.Provider value={{ toasts, showToast, dismissToast }}>
      {children}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </ToastContext.Provider>
  )
}

/** useToast — consume ToastContext. Throws if used outside <ToastProvider>. */
export function useToast() {
  const context = useContext(ToastContext)
  if (!context) throw new Error('useToast must be used inside <ToastProvider>')
  return context
}

/* ── ToastContainer — renders the active toasts ─────────── */
import styles from './ToastContext.module.css'

function ToastContainer({ toasts, onDismiss }) {
  if (toasts.length === 0) return null

  return (
    <div className={styles.container} aria-live="polite" aria-atomic="false">
      {toasts.map((toast) => (
        <div key={toast.id} className={[styles.toast, styles[toast.type]].join(' ')} role="alert">
          <span className={styles.message}>{toast.message}</span>
          <button
            className={styles.close}
            onClick={() => onDismiss(toast.id)}
            aria-label="Dismiss notification"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  )
}
