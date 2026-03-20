import { useState } from 'react'

export const Modal = ({ 
  isOpen, 
  onClose, 
  title, 
  children,
  footer,
  size = 'md',
  closeButton = true
}) => {
  if (!isOpen) return null

  const sizes = {
    sm: 'w-96',
    md: 'w-full max-w-md',
    lg: 'w-full max-w-lg',
    xl: 'w-full max-w-xl'
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className={`${sizes[size]} bg-white rounded-lg shadow-lg overflow-hidden`}>
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
            <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
            {closeButton && (
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition text-2xl"
              >
                ×
              </button>
            )}
          </div>

          {/* Body */}
          <div className="px-6 py-4">
            {children}
          </div>

          {/* Footer */}
          {footer && (
            <div className="border-t border-gray-200 px-6 py-4 bg-gray-50">
              {footer}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Modal
