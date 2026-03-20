export const API_ROUTES = {
  AUTH: '/api/auth',
  USERS: '/api/users',
  POLICIES: '/api/policies',
  CLAIMS: '/api/claims',
  ASSESSMENT: '/api/assessment'
}

export const POLICY_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  EXPIRED: 'expired',
  CANCELLED: 'cancelled',
  PENDING: 'pending'
}

export const CLAIM_STATUS = {
  DRAFT: 'draft',
  SUBMITTED: 'submitted',
  UNDER_REVIEW: 'under_review',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  PAID: 'paid',
  PARTIAL_PAID: 'partial_paid'
}

export const ERRORS = {
  UNAUTHORIZED: 'Unauthorized',
  FORBIDDEN: 'Forbidden',
  NOT_FOUND: 'Not found',
  VALIDATION_ERROR: 'Validation error',
  DUPLICATE_EMAIL: 'Email already registered',
  INVALID_CREDENTIALS: 'Invalid credentials',
  TOKEN_EXPIRED: 'Token expired',
  SERVER_ERROR: 'Internal server error'
}

export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Login successful',
  REGISTER_SUCCESS: 'Registration successful',
  LOGOUT_SUCCESS: 'Logout successful',
  POLICY_CREATED: 'Policy created',
  POLICY_UPDATED: 'Policy updated',
  POLICY_DELETED: 'Policy deleted',
  CLAIM_FILED: 'Claim filed successfully'
}
