export const Alert = ({ 
  type = 'info',
  title,
  message, 
  onClose,
  className = ''
}) => {
  const typeStyles = {
    info: 'bg-blue-50 border-blue-200 text-blue-800',
    success: 'bg-green-50 border-green-200 text-green-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    danger: 'bg-red-50 border-red-200 text-red-800'
  }

  const iconColors = {
    info: 'text-blue-600',
    success: 'text-green-600',
    warning: 'text-yellow-600',
    danger: 'text-red-600'
  }

  const icons = {
    info: '✓',
    success: '✓',
    warning: '⚠',
    danger: '✕'
  }

  return (
    <div className={`border rounded-lg p-4 mb-4 ${typeStyles[type]} ${className}`}>
      <div className="flex items-start gap-4">
        <span className={`text-xl font-bold ${iconColors[type]}`}>
          {icons[type]}
        </span>
        <div className="flex-1">
          {title && <h4 className="font-semibold mb-1">{title}</h4>}
          <p className="text-sm">{message}</p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  )
}

export default Alert
