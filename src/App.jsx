import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import { AppLoader, AppError } from './components/AppStatus.jsx'
import { useSiteData } from './context/SiteDataContext.jsx'

export default function App() {
  const location = useLocation()
  const { data, status, error, reload } = useSiteData()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  useEffect(() => {
    if (data?.site?.title) document.title = data.site.title
    if (data?.site?.favicon) {
      let link = document.querySelector("link[rel~='icon']")
      if (!link) {
        link = document.createElement('link')
        link.rel = 'icon'
        document.head.appendChild(link)
      }
      link.href = data.site.favicon
    }
  }, [data])

  if (status === 'loading') {
    return <AppLoader text={data?.site?.loadingText || 'Loading…'} />
  }

  if (status === 'error') {
    return <AppError message={error?.message} onRetry={reload} />
  }

  return (
    <div className="site">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
