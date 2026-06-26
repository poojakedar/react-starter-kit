/**
 * Card.jsx — Generic content card
 *
 * Props:
 *   title    — card heading
 *   children — card body content
 *   footer   — optional footer content (JSX or string)
 */
import PropTypes from 'prop-types'
import styles from './Card.module.css'

function Card({ title, children, footer }) {
  return (
    <article className={styles.card}>
      {title && <h3 className={styles.title}>{title}</h3>}
      <div className={styles.body}>{children}</div>
      {footer && <div className={styles.footer}>{footer}</div>}
    </article>
  )
}

Card.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
  footer: PropTypes.node,
}

export default Card
