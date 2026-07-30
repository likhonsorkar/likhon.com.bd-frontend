import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { getSiteData } from '../api/client.jsx'

const SiteDataContext = createContext(null)

export function SiteDataProvider({ children }) {
  const [data, setData] = useState(null)
  const [status, setStatus] = useState('loading') // loading | success | error
  const [error, setError] = useState(null)

  const load = useCallback((force = false) => {
    setStatus('loading')
    getSiteData({ force })
      .then((json) => {
        setData(json)
        setStatus('success')
      })
      .catch((err) => {
        setError(err)
        setStatus('error')
      })
  }, [])

  useEffect(() => {
    load()
  }, [load])

  return (
    <SiteDataContext.Provider value={{ data, status, error, reload: () => load(true) }}>
      {children}
    </SiteDataContext.Provider>
  )
}

/** Access the full site data payload + loading/error status anywhere in the tree. */
export function useSiteData() {
  const ctx = useContext(SiteDataContext)
  if (!ctx) {
    throw new Error('useSiteData must be used within a SiteDataProvider')
  }
  return ctx
}
