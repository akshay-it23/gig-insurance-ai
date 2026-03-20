import apiClient from './apiClient'

export const authService = {
  register: (userData) => {
    return apiClient.post('/auth/register', userData)
  },

  login: (credentials) => {
    return apiClient.post('/auth/login', credentials)
  },

  logout: () => {
    return apiClient.post('/auth/logout')
  },

  refreshToken: () => {
    return apiClient.post('/auth/refresh')
  },

  verifyEmail: (token) => {
    return apiClient.post('/auth/verify-email', { token })
  },

  resendVerificationEmail: (email) => {
    return apiClient.post('/auth/resend-verification', { email })
  }
}

export default authService
