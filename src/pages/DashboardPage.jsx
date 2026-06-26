/**
 * DashboardPage.jsx — Protected page (requires authentication)
 *
 * Demonstrates:
 *   - Reading the authenticated user from useAuth
 *   - Triggering a toast notification via useToast
 *   - Fetching users via api.js (the minimal fetch wrapper) + useFetch hook
 *   - Loading, error, and success states
 *   - Rendering the PostList feature component inside PostsProvider
 */
import { useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { useToast } from '@/context/ToastContext'
import { useFetch } from '@/hooks/useFetch'
import { PostsProvider } from '@/features/posts/PostsContext'
import PostList from '@/features/posts/PostList'
import Button from '@/components/Button/Button'
import Loader from '@/components/Loader/Loader'
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage'
import styles from './DashboardPage.module.css'

function DashboardPage() {
  const { user, logout } = useAuth()
  const { showToast } = useToast()

  // Fetch users from JSONPlaceholder via the minimal api.js fetch wrapper.
  // useFetch calls apiService internally, but you can swap in api.js directly:
  //   import { users } from '@/services/api'
  //   const data = await users.getAll()
  const {
    data: apiUsers,
    loading: usersLoading,
    error: usersError,
    refetch: refetchUsers,
  } = useFetch('/users?_limit=5')

  // Greet the user once when they land on the dashboard
  useEffect(() => {
    showToast({ message: `Welcome back${user?.name ? `, ${user.name}` : ''}!`, type: 'success' })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  function handleLogout() {
    logout()
    showToast({ message: 'You have been signed out.', type: 'info' })
  }

  return (
    <section>
      {/* ── Header row ── */}
      <div className={styles.header}>
        <div>
          <h1 className={styles.heading}>Dashboard</h1>
          {user && (
            <p className={styles.sub}>
              Signed in as <strong>{user.email}</strong>
              {user.role && <span className={styles.badge}>{user.role}</span>}
            </p>
          )}
        </div>
        <Button variant="secondary" onClick={handleLogout}>
          Sign out
        </Button>
      </div>

      {/* ── Users section — fetched via api.js ── */}
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Users</h2>
        <small className={styles.hint}>
          Fetched via <code>api.js</code> (native fetch)
        </small>
      </div>

      {usersLoading && <Loader label="Loading users…" />}
      {usersError && <ErrorMessage error={usersError} onRetry={refetchUsers} compact />}

      {!usersLoading && !usersError && apiUsers && (
        <div className={styles.userGrid}>
          {apiUsers.map((u) => (
            <div key={u.id} className={styles.userCard}>
              <img
                src={`https://i.pravatar.cc/48?u=${u.email}`}
                alt={u.name}
                className={styles.userAvatar}
              />
              <div>
                <p className={styles.userName}>{u.name}</p>
                <p className={styles.userEmail}>{u.email}</p>
                <p className={styles.userMeta}>{u.company?.name}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Posts section — managed via PostsContext (useReducer) ── */}
      <div className={styles.sectionHeader} style={{ marginTop: '2.5rem' }}>
        <h2 className={styles.sectionTitle}>Posts</h2>
        <small className={styles.hint}>
          Managed via <code>PostsContext</code> (useReducer)
        </small>
      </div>

      <PostsProvider>
        <PostList />
      </PostsProvider>
    </section>
  )
}

export default DashboardPage
