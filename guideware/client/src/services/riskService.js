import apiClient from './apiClient'

export const riskService = {
  getRiskAssessment: (userId) => {
    return apiClient.get(`/assessment/${userId}`)
  },

  evaluateRisk: (assessmentData) => {
    return apiClient.post('/assessment/evaluate', assessmentData)
  },

  updateRiskProfile: (userId, profileData) => {
    return apiClient.put(`/assessment/${userId}/profile`, profileData)
  },

  getRiskHistory: (userId) => {
    return apiClient.get(`/assessment/${userId}/history`)
  },

  getRecommendedCoverage: (riskScore) => {
    return apiClient.post('/assessment/recommendations', { riskScore })
  }
}

export default riskService
