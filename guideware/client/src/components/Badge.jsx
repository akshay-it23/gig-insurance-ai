const Badge = ({ 
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  ...props
}) => {
  const variants = {
    primary: 'bg-blue-100 text-blue-800',
    secondary: 'bg-gray-100 text-gray-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    danger: 'bg-red-100 text-red-800',
    info: 'bg-indigo-100 text-indigo-800'
  }

  const sizes = {
    sm: 'px-2 py-1 text-xs font-medium rounded',
    md: 'px-3 py-1 text-sm font-medium rounded-full',
    lg: 'px-4 py-2 text-base font-medium rounded-full'
  }

  return (
    <span className={`inline-block ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {children}
    </span>
  )
}

const Tag = ({ 
  label,
  onRemove,
  variant = 'primary',
  className = ''
}) => {
  return (
    <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium bg-${variant}-100 text-${variant}-800 ${className}`}>
      {label}
      {onRemove && (
        <button
          onClick={onRemove}
          className="hover:bg-gray-300 rounded-full w-4 h-4 flex items-center justify-center"
        >
          ×
        </button>
      )}
    </span>
  )
}

export default Badge
export { Tag }
