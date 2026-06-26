/**
 * HomePage.jsx — Landing page
 *
 * Demonstrates conditional rendering based on authentication state:
 *   - Guest view: hero section + call-to-action to sign in
 *   - Authenticated view: personalised welcome + live post feed via useFetch
 */
import { Link } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { useFetch } from '@/hooks/useFetch'
import Card from '@/components/Card/Card'
import Loader from '@/components/Loader/Loader'
import Button from '@/components/Button/Button'
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage'
import styles from './HomePage.module.css'
import { ROUTES } from '@/utils/constants'

/* ── Feature highlights shown to guests ─────────────────────────────── */
const FEATURES = [
  { icon: '⚡', title: 'Vite', description: 'Sub-second HMR and optimised production builds.' },
  {
    icon: '🔐',
    title: 'Auth',
    description: 'Mock auth flow with Context API — swap for real backend.',
  },
  {
    icon: '🌐',
    title: 'API',
    description: 'Minimal fetch wrapper + Axios client with interceptors.',
  },
  { icon: '🎨', title: 'CSS Modules', description: 'Scoped, collision-free component styles.' },
]

/* ── Guest view ──────────────────────────────────────────────────────── */
function GuestHero() {
  return (
    <div className={styles.hero}>
      <h1 className={styles.heading}>Welcome to React Starter Kit</h1>
      <p className={styles.subheading}>
        A modern, scalable foundation for your next React application — built with Vite, React
        Router, Context API, and clean tooling.
      </p>
      <div className={styles.heroCta}>
        <Link to={`/${ROUTES.LOGIN}`}>
          <Button variant="primary" size="lg">
            Sign in to get started
          </Button>
        </Link>
        <Link to={`/${ROUTES.ABOUT}`}>
          <Button variant="secondary" size="lg">
            Learn more
          </Button>
        </Link>
      </div>

      <div className={styles.features}>
        {FEATURES.map(({ icon, title, description }) => (
          <div key={title} className={styles.feature}>
            <span className={styles.featureIcon}>{icon}</span>
            <h3 className={styles.featureTitle}>{title}</h3>
            <p className={styles.featureDesc}>{description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Authenticated view ──────────────────────────────────────────────── */
function AuthenticatedHome({ user }) {
  const { data: posts, loading, error, refetch } = useFetch('/posts?_limit=6')

  return (
    <section>
      {/* Personalised welcome banner */}
      <div className={styles.welcomeBanner}>
        {user.avatar && <img src={user.avatar} alt={user.name} className={styles.avatar} />}
        <div className={styles.welcomeText}>
          <h1 className={styles.heading}>Welcome back, {user.name}!</h1>
          <p className={styles.subheading}>
            Signed in as <strong>{user.email}</strong> · Role: <code>{user.role}</code>
          </p>
        </div>
        <Link to={`/${ROUTES.DASHBOARD}`}>
          <Button variant="primary">Go to Dashboard →</Button>
        </Link>
      </div>

      {/* Live post feed */}
      <div className={styles.feedHeader}>
        <h2 className={styles.sectionTitle}>Latest Posts</h2>
        <Button variant="secondary" size="sm" onClick={refetch} disabled={loading}>
          {loading ? 'Loading…' : 'Refresh'}
        </Button>
      </div>

      {loading && <Loader />}
      {error && <ErrorMessage error={error} onRetry={refetch} />}

      {!loading && !error && posts && (
        <div className={styles.grid}>
          {posts.map((post) => (
            <Card key={post.id} title={post.title} footer={<small>Post #{post.id}</small>}>
              {post.body}
            </Card>
          ))}
        </div>
      )}
    </section>
  )
}

/* ── Page component ──────────────────────────────────────────────────── */
function HomePage() {
  const { isAuthenticated, user, isLoading } = useAuth()

  if (isLoading) return <Loader label="Restoring session…" />

  return isAuthenticated ? <AuthenticatedHome user={user} /> : <GuestHero />
}

export default HomePage
