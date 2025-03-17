'use client'

import { useState, useEffect } from 'react'
import { updateEntry } from '@/utils/api'

interface Entry {
  id: string;
  content: string;
  analysis?: {
    mood?: string;
    summary?: string;
    color?: string;
    subject?: string;
    negative?: boolean;
  };
}

const Editor = ({ entry }: { entry: Entry }) => {
  const [value, setValue] = useState(entry.content)
  const [isLoading, setIsLoading] = useState(false)
  const [analysis, setAnalysis] = useState(entry.analysis || {})
  const [saved, setSaved] = useState(false)

  const {
    mood = '',
    summary = '',
    color = '',
    subject = '',
    negative = false,
  } = analysis

  const analysisData = [
    { name: 'Summary', value: summary, icon: '📝' },
    { name: 'Subject', value: subject, icon: '🔍' },
    { name: 'Mood', value: mood, icon: '😊' },
    {
      name: 'Negative',
      value: negative ? 'True' : 'False',
      icon: negative ? '⚠️' : '✅',
    },
  ]

  // Handle save notification
  useEffect(() => {
    if (saved) {
      const timer = setTimeout(() => setSaved(false), 2000)
      return () => clearTimeout(timer)
    }
  }, [saved])

  // Manual save function
  const handleSave = async () => {
    setIsLoading(true)
    try {
      const data = await updateEntry(entry.id, value)
      if (data && data.analysis) {
        setAnalysis(data.analysis)
        setSaved(true)
      }
    } catch (error) {
      console.error('Failed to update entry:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const bgColor = color || '#f3f4f6'
  const textColor = getBrightness(bgColor) > 128 ? '#1f2937' : '#f9fafb'

  return (
    <div className="w-full h-full flex flex-col lg:flex-row shadow-xl rounded-xl overflow-hidden border border-gray-200">
      {/* Editor Section */}
      <div className="w-full lg:w-2/3 relative bg-white flex flex-col min-h-[300px] sm:min-h-[350px] lg:min-h-0">
        {/* Loading and Saved Indicators */}
        <div className="absolute top-3 sm:top-4 right-3 sm:right-4 z-10 flex flex-col items-end gap-2">
          {isLoading && (
            <div className="bg-white shadow-md rounded-full px-2 sm:px-3 py-1 text-xs sm:text-sm text-gray-600 flex items-center animate-fadeIn border border-gray-100">
              <svg className="animate-spin h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Processing...
            </div>
          )}

          {saved && (
            <div className="bg-green-50 shadow-md rounded-full px-2 sm:px-3 py-1 text-xs sm:text-sm text-green-700 flex items-center animate-bounce-once border border-green-100">
              <svg
                className="h-3 w-3 sm:h-4 sm:w-4 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Saved!
            </div>
          )}
        </div>

        {/* Textarea with decorative elements */}
        <div className="flex-grow flex flex-col relative">
          <div className="absolute top-0 left-0 w-full h-2 sm:h-3 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 opacity-80 z-10"></div>

          <textarea
            className="w-full flex-grow pt-4 sm:pt-6 px-3 sm:px-4 pb-3 sm:pb-4 md:pt-8 md:px-6 md:pb-4 lg:pt-10 lg:px-8 lg:pb-4 text-sm sm:text-base md:text-lg lg:text-xl outline-none transition-all duration-300 focus:bg-gray-50 resize-none"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Write your thoughts here..."
            style={{
              boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.06)',
              backgroundImage:
                'linear-gradient(to bottom, rgba(249,250,251,0.8), rgba(255,255,255,1))',
            }}
          ></textarea>

          {/* Controls at the bottom - now part of the flex layout */}
          <div className="flex items-center justify-between px-3 py-2 sm:px-4 sm:py-3 md:px-6 md:py-4 lg:px-8 lg:py-4 border-t border-gray-100 bg-white/80 backdrop-blur-sm">
            <button
              onClick={handleSave}
              disabled={isLoading}
              className={`flex items-center px-3 py-1.5 sm:px-4 sm:py-2 rounded-md sm:rounded-lg text-white text-sm sm:text-base font-medium transition-all duration-200 ${
                isLoading
                  ? 'bg-blue-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 hover:shadow-md active:scale-95'
              }`}
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2"
                    viewBox="0 0 24 24"
                  >
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span className="whitespace-nowrap">Saving...</span>
                </>
              ) : (
                <>
                  <svg
                    className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                  </svg>
                  <span className="whitespace-nowrap">Save & Analyze</span>
                </>
              )}
            </button>

            <div className="text-xs font-medium text-gray-400 bg-white/60 px-2 py-1 rounded-full">
              {value.length} characters
            </div>
          </div>
        </div>
      </div>

      {/* Analysis Section */}
      <div className="w-full lg:w-1/3 border-t lg:border-t-0 lg:border-l border-black/10 flex flex-col bg-gray-50 max-h-[50vh] lg:max-h-none">
        <div
          className="px-3 py-4 sm:px-4 sm:py-6 md:px-6 md:py-8 transition-colors duration-300 relative overflow-hidden backdrop-blur-sm"
          style={{ backgroundColor: bgColor, color: textColor }}
        >
          <div className="absolute top-0 right-0 opacity-10 text-5xl sm:text-7xl transform -translate-y-1 translate-x-1 sm:-translate-y-2 sm:translate-x-1">
            {negative ? '😟' : '😊'}
          </div>
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight mb-0 sm:mb-1 relative z-10">
            Analysis
          </h2>
          <p className="text-xs sm:text-sm opacity-80 truncate">
            AI-generated insights from your entry
          </p>
        </div>

        <div className="flex-grow overflow-y-auto">
          {!mood && !summary && !subject && (
            <div className="p-4 sm:p-6 text-center text-sm sm:text-base text-gray-500">
              Save your entry to generate AI analysis
            </div>
          )}

          <ul className="divide-y divide-black/5">
            {analysisData.map((item, index) =>
              item.value ? (
                <li
                  key={item.name}
                  className="p-3 sm:p-4 md:p-6 transition-all duration-300 hover:bg-white group animate-fadeIn"
                  style={{
                    animationDelay: `${index * 150}ms`,
                    animationDuration: '0.5s',
                  }}
                >
                  <div className="flex items-center mb-1 sm:mb-2">
                    <span className="text-base sm:text-xl mr-2 transform group-hover:scale-110 transition-transform duration-300">
                      {item.icon}
                    </span>
                    <span className="text-sm sm:text-base md:text-lg font-semibold text-gray-700">
                      {item.name}
                    </span>
                  </div>
                  <div className="text-xs sm:text-sm md:text-base text-gray-600 break-words max-w-full pl-6 sm:pl-8 transition-all duration-300 group-hover:text-gray-900 rounded-md group-hover:bg-gray-50/50 py-1">
                    {item.value || 'Not available'}
                  </div>
                </li>
              ) : null
            )}
          </ul>
        </div>
      </div>
    </div>
  )
}

// Utility function to determine if text should be light or dark based on background
function getBrightness(color: string) {
  // For hex colors
  if (color.startsWith('#')) {
    const hex = color.slice(1)
    const r = parseInt(hex.slice(0, 2), 16)
    const g = parseInt(hex.slice(2, 4), 16)
    const b = parseInt(hex.slice(4, 6), 16)
    return (r * 299 + g * 587 + b * 114) / 1000
  }
  // Default for unknown formats
  return 128
}

export default Editor