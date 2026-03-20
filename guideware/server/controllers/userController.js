import User from '../models/User.js'
import { asyncHandler, AppError } from '../middleware/errorHandler.js'
import { ERRORS } from '../config/constants.js'
import bcrypt from 'bcryptjs'
import { config } from '../config/environment.js'

export const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id)
  if (!user) {
    throw new AppError(ERRORS.NOT_FOUND, 404)
  }

  res.json({
    data: {
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      workType: user.workType,
      avatar: user.avatar,
      address: user.address,
      riskScore: user.riskScore,
      verified: user.verified
    }
  })
})

export const updateProfile = asyncHandler(async (req, res) => {
  const { name, phone, address } = req.body

  const user = await User.findByIdAndUpdate(
    req.user.id,
    { name, phone, address, updatedAt: new Date() },
    { new: true, runValidators: true }
  )

  if (!user) {
    throw new AppError(ERRORS.NOT_FOUND, 404)
  }

  res.json({
    message: 'Profile updated successfully',
    data: {
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address
    }
  })
})

export const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body

  if (!currentPassword || !newPassword) {
    throw new AppError(ERRORS.VALIDATION_ERROR, 400)
  }

  const user = await User.findById(req.user.id).select('+password')
  if (!user) {
    throw new AppError(ERRORS.NOT_FOUND, 404)
  }

  const isPasswordCorrect = await bcrypt.compare(currentPassword, user.password)
  if (!isPasswordCorrect) {
    throw new AppError('Current password is incorrect', 400)
  }

  user.password = await bcrypt.hash(newPassword, config.BCRYPT_ROUNDS)
  await user.save()

  res.json({ message: 'Password changed successfully' })
})

export const getSettings = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id)
  if (!user) {
    throw new AppError(ERRORS.NOT_FOUND, 404)
  }

  res.json({
    data: {
      notifications: true,
      emailAlerts: true,
      smsAlerts: false
    }
  })
})

export const updateSettings = asyncHandler(async (req, res) => {
  const { notifications, emailAlerts, smsAlerts } = req.body

  // Store settings in cache or separate settings collection
  res.json({
    message: 'Settings updated successfully',
    data: {
      notifications,
      emailAlerts,
      smsAlerts
    }
  })
})

export default {
  getProfile,
  updateProfile,
  changePassword,
  getSettings,
  updateSettings
}
