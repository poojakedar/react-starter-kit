/**
 * AboutPage.jsx — About page
 *
 * A static informational page showcasing the starter kit's tech stack
 * and project conventions.
 */
import Card from '@/components/Card/Card'
import styles from './AboutPage.module.css'

const STACK = [
  { title: 'React 18', description: 'Concurrent rendering, hooks, strict mode.' },
  { title: 'Vite', description: 'Lightning-fast HMR and optimized production builds.' },
  { title: 'React Router v6', description: 'Declarative client-side routing.' },
  { title: 'Axios', description: 'Promise-based HTTP client with interceptors.' },
  { title: 'CSS Modules', description: 'Scoped, collision-free component styles.' },
  { title: 'ESLint + Prettier', description: 'Consistent code quality and formatting.' },
]

function AboutPage() {
  return (
    <section>
      <h1 className={styles.heading}>About this Starter Kit</h1>
      <p className={styles.intro}>
        This project provides a battle-tested starting point for React applications. Each decision
        is intentional — favouring simplicity, scalability, and developer experience over heavy
        abstractions.
      </p>

      <h2 className={styles.sectionTitle}>Tech Stack</h2>
      <div className={styles.grid}>
        {STACK.map(({ title, description }) => (
          <Card key={title} title={title}>
            {description}
          </Card>
        ))}
      </div>
    </section>
  )
}

export default AboutPage
