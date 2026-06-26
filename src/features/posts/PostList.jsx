/**
 * PostList.jsx — Feature component that renders the posts list
 *
 * Consumes PostsContext (via usePosts). Demonstrates:
 *   - Fetching on mount via context action
 *   - Loading skeleton state
 *   - Inline error display with retry
 *   - Optimistic delete
 */
import { useEffect } from 'react'
import { usePosts } from './PostsContext'
import Card from '@/components/Card/Card'
import Loader from '@/components/Loader/Loader'
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage'
import Button from '@/components/Button/Button'
import styles from './PostList.module.css'

function PostList() {
  const { posts, loading, error, fetchPosts, removePost } = usePosts()

  useEffect(() => {
    fetchPosts({ page: 1, limit: 6, replace: true })
  }, [fetchPosts])

  if (loading && posts.length === 0) return <Loader />

  if (error && posts.length === 0) {
    return <ErrorMessage error={error} onRetry={() => fetchPosts()} />
  }

  return (
    <div>
      {error && <ErrorMessage error={error} onRetry={() => fetchPosts()} compact />}

      <div className={styles.grid}>
        {posts.map((post) => (
          <Card
            key={post.id}
            title={post.title}
            footer={
              <div className={styles.cardFooter}>
                <small>Post #{post.id}</small>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => removePost(post.id)}
                  aria-label={`Delete post ${post.id}`}
                >
                  Delete
                </Button>
              </div>
            }
          >
            {post.body}
          </Card>
        ))}
      </div>

      {loading && <Loader label="Loading more…" />}
    </div>
  )
}

export default PostList
