# React Starter Kit

A modern, production-ready React starter kit built with **Vite**, **React 18**, and **React Router v6**. Designed for scalable front-end applications with clean architecture and best-practice tooling.

---

## Features

- **Vite** — sub-second HMR and optimised builds
- **React 18** — concurrent rendering, hooks, StrictMode
- **React Router v6** — nested routes, layout pattern, protected routes
- **Mock authentication** — login/logout with session restore; zero backend required
- **Dual API layer** — `api.js` (native fetch) and `apiService.js` (Axios + interceptors + `AppError`)
- **Context API state management** — `AuthContext`, `AppContext` (theme), `ToastContext`, `PostsContext`
- **Custom hooks** — `useAuth`, `useFetch` (AbortController), `useLocalStorage`, `useDebounce`
- **Error handling** — `ErrorBoundary` (crash isolation), `ErrorMessage` (inline UI), structured `AppError`
- **CSS Modules** — scoped, collision-free styles with dark-mode support
- **ESLint + Prettier** — code quality & consistent formatting
- **Feature-based folder structure** — `src/features/` scales as the app grows
- **Environment variables** — `.env` support via Vite

---

## Project Structure

```
src/
├── assets/                        # Static assets (images, fonts, icons)
│
├── components/                    # Reusable UI components
│   ├── Button/                    #   Polymorphic button — variant × size × disabled
│   ├── Card/                      #   Content card with title, body, optional footer slot
│   ├── ErrorBoundary/             #   Class-based React error boundary (crash isolation)
│   ├── ErrorMessage/              #   Inline error UI — reads AppError.userMessage + retry
│   ├── Footer/                    #   Site-wide footer
│   ├── Header/                    #   Sticky nav with auth-aware links + theme toggle
│   ├── Layout/                    #   Route shell — Header + <Outlet /> + Footer
│   ├── Loader/                    #   Accessible full-page spinner (role="status")
│   └── ProtectedRoute/            #   Route guard — redirects unauthenticated users to /login
│
├── context/                       # Global app-wide state (not feature-specific)
│   ├── AppContext.jsx              #   Theme (light/dark) persisted to localStorage
│   └── ToastContext.jsx            #   App-wide toast notifications + ToastContainer
│
├── features/                      # Feature-first modules (self-contained)
│   ├── auth/
│   │   ├── AuthContext.jsx         #   Mock auth — login/logout, session restore, no backend
│   │   ├── authService.js          #   Auth API stubs (swap for real endpoints)
│   │   ├── LoginPage.jsx           #   Login form with demo credentials panel
│   │   └── LoginPage.module.css
│   └── posts/
│       ├── PostsContext.jsx        #   useReducer-based posts state (fetch, add, remove)
│       ├── postsService.js         #   Posts CRUD via apiService
│       ├── PostList.jsx            #   Posts feature component (loading, error, optimistic delete)
│       └── PostList.module.css
│
├── hooks/                         # Custom React hooks
│   ├── useAuth.js                  #   Thin re-export of AuthContext hook (stable import path)
│   ├── useDebounce.js              #   Debounce a rapidly-changing value
│   ├── useFetch.js                 #   Generic data fetching — loading/error/data + AbortController
│   └── useLocalStorage.js         #   useState synced to localStorage
│
├── pages/                         # Route-level page components
│   ├── AboutPage.jsx               #   Tech stack overview
│   ├── DashboardPage.jsx           #   Protected — shows users (api.js) + posts (PostsContext)
│   ├── HomePage.jsx                #   Conditional: guest hero or authenticated feed
│   └── NotFoundPage.jsx            #   404 with back-link
│
├── services/                      # API / external service layer
│   ├── api.js                      #   Minimal native-fetch wrapper (get/post/put/del + domain helpers)
│   └── apiService.js               #   Full Axios client — AppError, interceptors, auth header
│
├── utils/                         # Pure utility functions
│   ├── constants.js                #   ROUTES, AUTH_TOKEN_KEY, pagination defaults, env values
│   ├── formatters.js               #   truncate, toTitleCase, formatCurrency, formatDate
│   └── validators.js               #   isValidEmail, isStrongPassword, isRequired
│
├── App.jsx                        # Route tree (public + protected routes, ErrorBoundary per route)
├── App.css                        # App-level styles
├── index.css                      # Global reset, CSS custom properties, dark-mode vars
└── main.jsx                       # Entry — BrowserRouter › AppProvider › AuthProvider › ToastProvider
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

```bash
cp .env.example .env
# Edit .env and set VITE_API_BASE_URL to your API
```

### 3. Start the dev server

```bash
npm run dev
# Opens http://localhost:3000
```

### 4. Log in locally

The app ships with **mock authentication** — no backend needed. Once the dev server is running:

1. Open **http://localhost:3000/login** in your browser
2. Click one of the **"Demo credentials"** shortcut buttons on the login page, or type manually:

| Account | Email              | Password      | Role   | Access    |
| ------- | ------------------ | ------------- | ------ | --------- |
| Admin   | `demo@example.com` | `password123` | admin  | All pages |
| Viewer  | `jane@example.com` | `password123` | viewer | All pages |

3. Click **Sign in** — you will be redirected to the home page, which now shows a personalised welcome banner and the **Dashboard** link in the header.
4. Visit **http://localhost:3000/dashboard** to see the protected page (users list + posts).
5. Click **Sign out** on the dashboard (or in the header) to return to the guest view.

> **Tip:** The session is saved in `localStorage`, so it survives a page refresh.  
> Clear `localStorage` (DevTools → Application → Local Storage) to force a fresh login.

> **Connecting a real backend:** open `src/features/auth/AuthContext.jsx`, replace the  
> `login()` body with a call to `authService.login(credentials)`, and remove `MOCK_USERS`.  
> The hook API (`useAuth`) stays identical — no component changes needed.

### 5. Build for production

```bash
npm run build
npm run preview   # Preview the production build locally
```

---

## Available Scripts

| Script                 | Description               |
| ---------------------- | ------------------------- |
| `npm run dev`          | Start Vite dev server     |
| `npm run build`        | Production build          |
| `npm run preview`      | Preview production build  |
| `npm run lint`         | Run ESLint                |
| `npm run lint:fix`     | Auto-fix ESLint issues    |
| `npm run format`       | Format with Prettier      |
| `npm run format:check` | Check Prettier formatting |

---

## Environment Variables

| Variable            | Default                                | Description               |
| ------------------- | -------------------------------------- | ------------------------- |
| `VITE_API_BASE_URL` | `https://jsonplaceholder.typicode.com` | Base URL for API requests |
| `VITE_APP_NAME`     | `React Starter Kit`                    | Application display name  |

---

## Architecture Decisions

- **Feature-first layout** — `src/features/auth/` and `src/features/posts/` are fully self-contained; moving or deleting a feature removes everything in one folder.
- **CSS Modules** — each component owns its styles, zero class-name collisions.
- **`@/` path alias** — `import x from '@/components/Button'` instead of fragile relative paths.
- **Two API clients** — `api.js` (native fetch, zero config) for quick calls; `apiService.js` (Axios) when you need interceptors, automatic auth headers, or structured `AppError` objects.
- **`AppError` class** — every rejected Axios call carries `{ status, userMessage, originalError }` so components never parse raw errors.
- **`useFetch` + `AbortController`** — in-flight requests are cancelled on unmount, preventing stale state updates.
- **Mock auth, real interface** — `AuthContext` validates against `MOCK_USERS` with a simulated delay. Connecting a real backend means replacing only the `login()` body; the hook API is unchanged.
- **Provider hierarchy** — `BrowserRouter → AppProvider → AuthProvider → ToastProvider` so inner providers can consume outer ones.
- **`ProtectedRoute`** — wraps any subtree; preserves the intended URL in `location.state.from` so users are redirected back after login.
- **`ErrorBoundary` per route** — a crash in one feature never brings down the entire app.
- **`ROUTES` constants** — all path strings live in `utils/constants.js`; renaming a route is a one-line change.
- **Layout route** — Header and Footer live in `Layout.jsx`; pages contain only page content.

---

## API Clients

Two clients are available — choose the one that fits your use case:

|                 | `services/api.js`         | `services/apiService.js`               |
| --------------- | ------------------------- | -------------------------------------- |
| **Transport**   | Native `fetch`            | Axios                                  |
| **Auth header** | Auto from `localStorage`  | Auto via request interceptor           |
| **Error shape** | `{ status, userMessage }` | `AppError` class                       |
| **Use when**    | Simple one-off calls      | Needs interceptors / structured errors |

```js
// api.js — native fetch
import { users, get } from '@/services/api'
const allUsers = await users.getAll()

// apiService.js — Axios
import { apiService } from '@/services/apiService'
const post = await apiService.get('/posts/1')
```

---

## State Management

| Scope               | Solution                                      | Location                              |
| ------------------- | --------------------------------------------- | ------------------------------------- |
| Authentication      | `AuthContext` + `useAuth` hook                | `src/features/auth/AuthContext.jsx`   |
| Theme (light/dark)  | `AppContext` + `useApp` hook                  | `src/context/AppContext.jsx`          |
| Toast notifications | `ToastContext` + `useToast` hook              | `src/context/ToastContext.jsx`        |
| Posts list          | `PostsContext` (useReducer) + `usePosts` hook | `src/features/posts/PostsContext.jsx` |

For heavier global state, the `PostsContext` pattern (Context + `useReducer`) scales well before reaching for Redux.

---

![React](https://img.shields.io/badge/React-18-blue)
![Vite](https://img.shields.io/badge/Vite-fast-purple)
