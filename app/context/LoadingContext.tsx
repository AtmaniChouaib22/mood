'use client'

import { createContext, useState, useContext, useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

const LoadingContext = createContext({
  isLoading: false,
  setIsLoading: (loading: boolean) => {}
})

import { ReactNode } from 'react'

export const LoadingProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false)
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Track route changes
  useEffect(() => {
    const handleRouteChangeStart = () => setIsLoading(true)
    const handleRouteChangeComplete = () => setIsLoading(false)
    
    // Set up a short delay before showing loading indicator to avoid flashes
    let loadingTimeout: NodeJS.Timeout
    
    const checkRouteChange = () => {
      clearTimeout(loadingTimeout)
      loadingTimeout = setTimeout(() => setIsLoading(true), 100)
    }
    
    // This will run on initial page load or when route changes
    checkRouteChange()
    
    // Clean up
    return () => {
      clearTimeout(loadingTimeout)
      setIsLoading(false)
    }
  }, [pathname, searchParams])

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
    </LoadingContext.Provider>
  )
}

export const useLoading = () => useContext(LoadingContext)