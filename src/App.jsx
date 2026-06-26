/**
 * App.jsx — Root application component
 *
 * Defines the top-level route structure. Add new routes here as your
 * application grows. The Layout component wraps all pages, providing a
 * consistent header/footer shell.
 */
import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from '@/components/Layout/Layout'
import HomePage from '@/pages/HomePage'
import AboutPage from '@/pages/AboutPage'
import NotFoundPage from '@/pages/NotFoundPage'
import './App.css'

function App() {
  return (
    <Routes>
      {/* All routes share the Layout shell (header + footer) */}
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        {/* Catch-all: redirect unknown paths to the 404 page */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App
