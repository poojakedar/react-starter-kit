/**
 * Button.jsx — Reusable button component
 *
 * Props:
 *   children  — button label / content
 *   variant   — 'primary' | 'secondary' | 'danger'  (default: 'primary')
 *   size      — 'sm' | 'md' | 'lg'                  (default: 'md')
 *   disabled  — disables the button and prevents click
 *   onClick   — click handler
 *   type      — html button type (default: 'button')
 */
import PropTypes from 'prop-types'
import styles from './Button.module.css'

function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick,
  type = 'button',
}) {
  return (
    <button
      type={type}
      className={[styles.btn, styles[variant], styles[size]].join(' ')}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'danger']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
}

export default Button
