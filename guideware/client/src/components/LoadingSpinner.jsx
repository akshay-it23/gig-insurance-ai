export const LoadingSpinner = ({ 
  size = 'md',
  fullScreen = false,
  message = 'Loading...'
}) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  }

  const content = (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className={`${sizes[size]} border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin`}></div>
      <p className="text-gray-600 text-sm font-medium">{message}</p>
    </div>
  )

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-75 flex items-center justify-center z-50">
        {content}
      </div>
    )
  }

  return content
}

export const Skeleton = ({ width = 'w-full', height = 'h-4', className = '' }) => {
  return (
    <div className={`${width} ${height} bg-gray-200 rounded animate-pulse ${className}`}></div>
  )
}

export default LoadingSpinner
