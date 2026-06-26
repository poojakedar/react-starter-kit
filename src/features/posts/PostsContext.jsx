/**
 * PostsContext.jsx — Shared posts state
 *
 * Centralises the posts list so multiple components can read and
 * update it without prop-drilling. Built on the Context + useReducer
 * pattern — a lightweight alternative to Redux for feature-scoped state.
 *
 * Usage:
 *   Wrap any sub-tree with <PostsProvider> then call usePosts() inside it.
 */
import { createContext, useContext, useReducer, useCallback } from 'react'
import { postsService } from './postsService'

/* ── State shape ─────────────────────────────────────────── */
const initialState = {
  posts: [],
  loading: false,
  error: null,
  page: 1,
  hasMore: true,
}

/* ── Reducer ─────────────────────────────────────────────── */
function postsReducer(state, action) {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loading: true, error: null }

    case 'FETCH_SUCCESS':
      return {
        ...state,
        loading: false,
        // Append for pagination; replace for a fresh load
        posts: action.replace ? action.payload : [...state.posts, ...action.payload],
        page: action.page,
        hasMore: action.payload.length > 0,
      }

    case 'FETCH_ERROR':
      return { ...state, loading: false, error: action.payload }

    case 'ADD_POST':
      return { ...state, posts: [action.payload, ...state.posts] }

    case 'REMOVE_POST':
      return { ...state, posts: state.posts.filter((p) => p.id !== action.payload) }

    default:
      return state
  }
}

/* ── Context ─────────────────────────────────────────────── */
const PostsContext = createContext(null)

export function PostsProvider({ children }) {
  const [state, dispatch] = useReducer(postsReducer, initialState)

  /** Load a page of posts. Pass { replace: true } to reset the list. */
  const fetchPosts = useCallback(async ({ page = 1, limit = 10, replace = true } = {}) => {
    dispatch({ type: 'FETCH_START' })
    try {
      const data = await postsService.getAll({ page, limit })
      dispatch({ type: 'FETCH_SUCCESS', payload: data, page, replace })
    } catch (err) {
      dispatch({ type: 'FETCH_ERROR', payload: err })
    }
  }, [])

  /** Optimistically remove a post (UI removes it immediately). */
  const removePost = useCallback((id) => {
    dispatch({ type: 'REMOVE_POST', payload: id })
    postsService.remove(id).catch(() => {
      // In a real app you'd re-fetch or restore the deleted item here
      console.warn(`Failed to delete post ${id} on the server`)
    })
  }, [])

  const value = { ...state, fetchPosts, removePost }

  return <PostsContext.Provider value={value}>{children}</PostsContext.Provider>
}

/** usePosts — consume PostsContext. Throws if used outside <PostsProvider>. */
export function usePosts() {
  const context = useContext(PostsContext)
  if (!context) throw new Error('usePosts must be used inside <PostsProvider>')
  return context
}
