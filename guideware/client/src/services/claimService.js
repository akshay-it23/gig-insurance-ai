import apiClient from './apiClient'

export const claimService = {
  getAllClaims: (filters = {}) => {
    return apiClient.get('/claims', { params: filters })
  },

  getClaimById: (id) => {
    return apiClient.get(`/claims/${id}`)
  },

  createClaim: (claimData) => {
    return apiClient.post('/claims', claimData)
  },

  updateClaim: (id, claimData) => {
    return apiClient.put(`/claims/${id}`, claimData)
  },

  deleteClaim: (id) => {
    return apiClient.delete(`/claims/${id}`)
  },

  getClaimsByUserId: (userId) => {
    return apiClient.get(`/claims/user/${userId}`)
  },

  uploadClaimDocuments: (id, formData) => {
    return apiClient.post(`/claims/${id}/documents`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },

  downloadClaimDocument: (claimId, docId) => {
    return apiClient.get(`/claims/${claimId}/documents/${docId}`, {
      responseType: 'blob'
    })
  },

  submitClaim: (id) => {
    return apiClient.post(`/claims/${id}/submit`)
  },

  getClaimStatus: (id) => {
    return apiClient.get(`/claims/${id}/status`)
  },

  approveClaim: (id, notes) => {
    return apiClient.post(`/claims/${id}/approve`, { notes })
  },

  rejectClaim: (id, reason) => {
    return apiClient.post(`/claims/${id}/reject`, { reason })
  }
}

export default claimService
