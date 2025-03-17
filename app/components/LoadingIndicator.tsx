'use client'

import { useLoading } from '@/app/context/LoadingContext'

const LoadingIndicator = () => {
  const { isLoading } = useLoading()

  if (!isLoading) return null

  return (
    <div className="fixed top-0 left-0 w-full z-50 pointer-events-none">
      {/* Loading bar animation */}
      <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-loading-bar"></div>
    </div>
  )
}

export default LoadingIndicator
