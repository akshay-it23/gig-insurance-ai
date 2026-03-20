// Policy status options
export const POLICY_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  EXPIRED: 'expired',
  CANCELLED: 'cancelled',
  PENDING: 'pending'
}

// Claim status options
export const CLAIM_STATUS = {
  DRAFT: 'draft',
  SUBMITTED: 'submitted',
  UNDER_REVIEW: 'under_review',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  PAID: 'paid',
  PARTIAL_PAID: 'partial_paid'
}

// Gig worker types
export const GIG_TYPES = {
  DELIVERY: 'delivery',
  RIDESHARE: 'rideshare',
  FREELANCE: 'freelance',
  TUTOR: 'tutor',
  HANDYMAN: 'handyman',
  OTHER: 'other'
}

// Coverage types
export const COVERAGE_TYPES = {
  ACCIDENT: 'accident',
  LIABILITY: 'liability',
  MEDICAL: 'medical',
  EQUIPMENT: 'equipment',
  BUSINESS_LOSS: 'business_loss'
}

// API error messages
export const ERROR_MESSAGES = {
  UNAUTHORIZED: 'Unauthorized. Please login again.',
  FORBIDDEN: 'You do not have permission to perform this action.',
  NOT_FOUND: 'Resource not found.',
  SERVER_ERROR: 'Server error. Please try again later.',
  NETWORK_ERROR: 'Network error. Please check your connection.',
  VALIDATION_ERROR: 'Please check your input and try again.'
}

// Success messages
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Login successful!',
  REGISTER_SUCCESS: 'Registration successful!',
  POLICY_CREATED: 'Policy created successfully!',
  POLICY_UPDATED: 'Policy updated successfully!',
  POLICY_DELETED: 'Policy deleted successfully!',
  CLAIM_FILED: 'Claim filed successfully!',
  CLAIM_UPDATED: 'Claim updated successfully!'
}
