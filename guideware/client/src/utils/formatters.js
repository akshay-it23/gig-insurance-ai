// Format currency
export const formatCurrency = (amount, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency
  }).format(amount)
}

// Format date
export const formatDate = (date) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(new Date(date))
}

// Format date with time
export const formatDateTime = (date) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date(date))
}

// Calculate status color
export const getStatusColor = (status) => {
  const statusMap = {
    active: 'bg-green-100 text-green-800',
    inactive: 'bg-gray-100 text-gray-800',
    pending: 'bg-yellow-100 text-yellow-800',
    approved: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800',
    expired: 'bg-red-100 text-red-800',
    cancelled: 'bg-gray-100 text-gray-800'
  }
  return statusMap[status?.toLowerCase()] || 'bg-gray-100 text-gray-800'
}

// Validate email
export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

// Validate password
export const validatePassword = (password) => {
  return password.length >= 8
}

// Get risk level color
export const getRiskLevelColor = (riskScore) => {
  if (riskScore <= 30) return 'text-green-600'
  if (riskScore <= 70) return 'text-yellow-600'
  return 'text-red-600'
}

// Get risk level text
export const getRiskLevelText = (riskScore) => {
  if (riskScore <= 30) return 'Low Risk'
  if (riskScore <= 70) return 'Medium Risk'
  return 'High Risk'
}

// Calculate days remaining
export const daysRemaining = (expiryDate) => {
  const today = new Date()
  const expiry = new Date(expiryDate)
  const diff = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24))
  return diff
}
