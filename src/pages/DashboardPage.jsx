/**
 * DashboardPage.jsx — Protected page (requires authentication)
 *
 * Demonstrates:
 *   - Reading the authenticated user from useAuth
 *   - Triggering a toast notification via useToast
 *   - Rendering the PostList feature component inside PostsProvider
 */
import { useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { useToast } from '@/context/ToastContext'
import { PostsProvider } from '@/features/posts/PostsContext'
import PostList from '@/features/posts/PostList'
import Button from '@/components/Button/Button'
import styles from './DashboardPage.module.css'

function DashboardPage() {
  const { user, logout } = useAuth()
  const { showToast } = useToast()

  // Greet the user once when they land on the dashboard
  useEffect(() => {
    showToast({ message: `Welcome back${user?.name ? `, ${user.name}` : ''}!`, type: 'success' })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  async function handleLogout() {
    await logout()
    showToast({ message: 'You have been signed out.', type: 'info' })
  }

  return (
    <section>
      <div className={styles.header}>
        <div>
          <h1 className={styles.heading}>Dashboard</h1>
          {user && (
            <p className={styles.sub}>
              Signed in as <strong>{user.email ?? user.name}</strong>
            </p>
          )}
        </div>
        <Button variant="secondary" onClick={handleLogout}>
          Sign out
        </Button>
      </div>

      <h2 className={styles.sectionTitle}>Posts</h2>

      {/*
        Wrap the posts feature in its own Context provider.
        This keeps posts state isolated to the pages that need it.
      */}
      <PostsProvider>
        <PostList />
      </PostsProvider>
    </section>
  )
}

export default DashboardPage
