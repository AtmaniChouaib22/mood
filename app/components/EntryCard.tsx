const EntryCard = ({ entry }) => {
  const creationDate = new Date(entry.createdAt).toDateString()
  const updateDate = new Date(entry.updatedAt).toDateString()
  const { mood = '', summary = '', subject = '', color = '#A1A1AA' } = entry.analysis || {}
  
  // Truncate long summaries
  const truncatedSummary = summary?.length > 100 ? `${summary.substring(0, 100)}...` : summary
  
  return (
    <div 
      className="h-full rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow"
      style={{ borderLeft: `6px solid ${color}` }}
    >
      <div className="p-5 bg-white h-full">
        {/* Header section */}
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-semibold text-gray-800 truncate">
            {subject || 'Untitled Entry'}
          </h3>
          <div className="px-2 py-1 bg-gray-100 rounded-full text-sm font-medium text-gray-600">
            {mood}
          </div>
        </div>
        
        {/* Summary section */}
        <div className="mt-2 mb-4">
          <p className="text-gray-600 line-clamp-3 text-sm md:text-base">
            {truncatedSummary || 'No summary available'}
          </p>
        </div>
        
        {/* Footer with dates */}
        <div className="flex flex-wrap justify-between text-xs text-gray-500 pt-2 border-t border-gray-100">
          <div className="mr-2 mb-1">Created: {creationDate}</div>
          {updateDate !== creationDate && (
            <div>Updated: {updateDate}</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default EntryCard
