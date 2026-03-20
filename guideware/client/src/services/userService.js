import apiClient from './apiClient'

export const userService = {
  getProfile: () => {
    return apiClient.get('/users/profile')
  },

  updateProfile: (profileData) => {
    return apiClient.put('/users/profile', profileData)
  },

  getUserById: (id) => {
    return apiClient.get(`/users/${id}`)
  },

  uploadProfilePicture: (formData) => {
    return apiClient.post('/users/profile/picture', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },

  changePassword: (passwordData) => {
    return apiClient.put('/users/change-password', passwordData)
  },

  getSettings: () => {
    return apiClient.get('/users/settings')
  },

  updateSettings: (settings) => {
    return apiClient.put('/users/settings', settings)
  }
}

export default userService
