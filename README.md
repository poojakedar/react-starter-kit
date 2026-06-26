# React Starter Kit

A modern, production-ready React starter kit built with **Vite**, **React 18**, and **React Router v6**. Designed for scalable front-end applications with clean architecture and best-practice tooling.

---

## Features

- **Vite** — sub-second HMR and optimised builds
- **React 18** — concurrent rendering, hooks
- **React Router v6** — nested routes, layout pattern
- **Axios** — centralised HTTP client with interceptors
- **CSS Modules** — scoped, collision-free styles
- **ESLint + Prettier** — code quality & consistent formatting
- **Feature-based folder structure** — scales as the app grows
- **Environment variables** — `.env` support via Vite

---

## Project Structure

```
src/
├── assets/           # Static assets (images, fonts, icons)
├── components/       # Reusable UI components
│   ├── Button/       #   Button.jsx + Button.module.css
│   ├── Card/         #   Card.jsx + Card.module.css
│   ├── Footer/       #   Footer.jsx + Footer.module.css
│   ├── Header/       #   Header.jsx + Header.module.css
│   ├── Layout/       #   Layout.jsx (route shell with <Outlet />)
│   └── Loader/       #   Loader.jsx (accessible spinner)
├── hooks/            # Custom React hooks
│   ├── useDebounce.js
│   ├── useFetch.js
│   └── useLocalStorage.js
├── pages/            # Route-level page components
│   ├── AboutPage.jsx
│   ├── HomePage.jsx
│   └── NotFoundPage.jsx
├── services/         # API / external service layer
│   └── apiService.js # Axios client with request/response interceptors
├── utils/            # Pure utility functions
│   ├── constants.js
│   ├── formatters.js
│   └── validators.js
├── App.jsx           # Route definitions
├── App.css           # App-level styles
├── index.css         # Global styles & CSS custom properties
└── main.jsx          # Entry point
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

### 4. Build for production

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

- **CSS Modules** — each component owns its styles, zero class-name collisions.
- **`@/` path alias** — `import x from '@/components/Button'` instead of relative paths.
- **`apiService.js`** — one place to set auth headers, base URL, and global error handling.
- **`useFetch`** — thin hook that pairs with `apiService` for clean async state in components.
- **Layout route** — Header and Footer live in `Layout.jsx`; pages only contain page content.

---

## 🚀 Features

- ⚡ Vite for fast development
- ✅ ESLint configured
- 🎯 Prettier for code formatting
- 📁 Clean and scalable folder structure
- 🔧 Ready-to-use scripts

---

![React](https://img.shields.io/badge/React-18-blue)
![Vite](https://img.shields.io/badge/Vite-fast-purple)
