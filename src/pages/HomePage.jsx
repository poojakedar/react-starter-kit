/**
 * HomePage.jsx — Landing page
 *
 * Demonstrates useFetch to load a list of posts from the JSONPlaceholder API
 * and renders them as Cards with a loading/error state.
 */
import { useFetch } from '@/hooks/useFetch'
import Card from '@/components/Card/Card'
import Loader from '@/components/Loader/Loader'
import Button from '@/components/Button/Button'
import styles from './HomePage.module.css'

function HomePage() {
  // Fetch the first 6 posts from the sample API
  const { data: posts, loading, error, refetch } = useFetch('/posts?_limit=6')

  return (
    <section>
      <div className={styles.hero}>
        <h1 className={styles.heading}>Welcome to React Starter Kit</h1>
        <p className={styles.subheading}>
          A modern, scalable foundation for your next React application — built with Vite, hooks,
          feature-based architecture, and clean tooling.
        </p>
        <Button onClick={refetch} variant="primary">
          Reload Posts
        </Button>
      </div>

      {loading && <Loader />}

      {error && <p className={styles.error}>Failed to load posts: {error.message}</p>}

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

export default HomePage
