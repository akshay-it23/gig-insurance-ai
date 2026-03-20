import apiClient from './apiClient'

export const policyService = {
  getAllPolicies: (filters = {}) => {
    return apiClient.get('/policies', { params: filters })
  },

  getPolicyById: (id) => {
    return apiClient.get(`/policies/${id}`)
  },

  createPolicy: (policyData) => {
    return apiClient.post('/policies', policyData)
  },

  updatePolicy: (id, policyData) => {
    return apiClient.put(`/policies/${id}`, policyData)
  },

  deletePolicy: (id) => {
    return apiClient.delete(`/policies/${id}`)
  },

  getPoliciesByUserId: (userId) => {
    return apiClient.get(`/policies/user/${userId}`)
  },

  renewPolicy: (id) => {
    return apiClient.post(`/policies/${id}/renew`)
  },

  cancelPolicy: (id, reason) => {
    return apiClient.post(`/policies/${id}/cancel`, { reason })
  },

  getAvailablePlans: () => {
    return apiClient.get('/policies/plans/available')
  },

  downloadPolicyDocument: (id) => {
    return apiClient.get(`/policies/${id}/download`, {
      responseType: 'blob'
    })
  }
}

export default policyService
