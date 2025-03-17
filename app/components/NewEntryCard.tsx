'use client'

import { createNewEntry } from '@/utils/api'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const NewEntryCard = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleOnClick = async () => {
    if (isLoading) return

    setIsLoading(true)
    try {
      const data = await createNewEntry()
      router.push(`/journal/${data.id}`)
    } catch (error) {
      console.error('Failed to create entry:', error)
      setIsLoading(false)
    }
  }

  return (
    <div
      onClick={handleOnClick}
      className={`
        h-full cursor-pointer rounded-lg border border-dashed border-gray-300
        bg-gradient-to-br from-white to-gray-50 shadow-sm hover:shadow-md 
        transition-all duration-200 transform hover:scale-[1.01]
        flex flex-col items-center justify-center text-center p-6
        ${
          isLoading ? 'opacity-70 pointer-events-none' : 'hover:border-blue-300'
        }
      `}
    >
      <div className="w-12 h-12 mb-3 rounded-full bg-blue-50 flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-blue-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
      </div>

      <h3 className="text-lg font-medium text-gray-800 mb-1">
        Create New Entry
      </h3>

      <p className="text-sm text-gray-500">
        {isLoading ? 'Creating...' : 'Record your thoughts and feelings'}
      </p>

      {isLoading && (
        <div className="mt-3 flex items-center justify-center">
          <div className="animate-spin h-5 w-5 border-2 border-blue-500 border-t-transparent rounded-full"></div>
        </div>
      )}
    </div>
  )
}

export default NewEntryCard
