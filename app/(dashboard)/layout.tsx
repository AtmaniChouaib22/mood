'use client'

import { UserButton } from '@clerk/nextjs'
import Sidebar from '../components/Sidebar'
import { useState, useEffect } from 'react'

import { ReactNode } from 'react';

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  // Handle responsive behavior
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 640)
      // Auto-close sidebar on mobile
      if (window.innerWidth < 640) {
        setSidebarOpen(false)
      } else {
        setSidebarOpen(true)
      }
    }

    // Check on initial load
    checkScreenSize()

    // Add event listener
    window.addEventListener('resize', checkScreenSize)

    // Clean up
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  return (
    <div className="h-screen w-screen relative overflow-hidden">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setSidebarOpen} />
      
      <div 
        className={`h-full transition-all duration-300 ease-in-out ${
          isSidebarOpen 
            ? 'ml-52 md:ml-80' 
            : isMobile 
              ? 'ml-0' 
              : 'ml-20'
        }`}
      >
        <header className="h-[60px] border-b border-black/10 px-4 sm:px-6">
          <div className="h-full w-full flex items-center justify-between">
            {/* Mobile menu toggle */}
            {isMobile && (
              <button 
                onClick={() => setSidebarOpen(!isSidebarOpen)}
                className="p-2 rounded-md hover:bg-gray-100"
                aria-label={isSidebarOpen ? 'Close menu' : 'Open menu'}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            )}
            
            <div className={`${isMobile ? '' : 'ml-auto'}`}>
              <UserButton />
            </div>
          </div>
        </header>
        
        <main className="h-[calc(100vh-60px)] overflow-y-auto p-4 sm:p-6">
          {children}
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout