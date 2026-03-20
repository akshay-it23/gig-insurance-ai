export const Card = ({ 
  title, 
  subtitle, 
  children, 
  className = '',
  footer = null,
  ...props 
}) => {
  return (
    <div className={`bg-white rounded-lg shadow-md hover:shadow-lg transition duration-200 ${className}`} {...props}>
      {title && (
        <div className="border-b border-gray-200 px-6 py-4">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          {subtitle && <p className="text-sm text-gray-600 mt-1">{subtitle}</p>}
        </div>
      )}
      <div className="px-6 py-4">
        {children}
      </div>
      {footer && (
        <div className="border-t border-gray-200 px-6 py-4 bg-gray-50 rounded-b-lg">
          {footer}
        </div>
      )}
    </div>
  )
}

export default Card
