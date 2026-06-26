/**
 * Layout.jsx — Application shell
 *
 * Wraps every page with a shared Header and Footer. The <Outlet /> is the
 * react-router-dom slot where the matched child route renders.
 */
import { Outlet } from 'react-router-dom'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import styles from './Layout.module.css'

function Layout() {
  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Layout
