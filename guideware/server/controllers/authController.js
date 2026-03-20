import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import { config } from '../config/environment.js'
import { asyncHandler, AppError } from '../middleware/errorHandler.js'
import { SUCCESS_MESSAGES, ERRORS } from '../config/constants.js'

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, config.JWT_SECRET, {
    expiresIn: config.JWT_EXPIRE
  })
}

export const register = asyncHandler(async (req, res) => {
  const { name, email, password, phone, workType } = req.body

  // Validate input
  if (!name || !email || !password || !phone || !workType) {
    throw new AppError(ERRORS.VALIDATION_ERROR, 400)
  }

  // Check if user already exists
  const existingUser = await User.findOne({ $or: [{ email }, { phone }] })
  if (existingUser) {
    throw new AppError(ERRORS.DUPLICATE_EMAIL, 409)
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, config.BCRYPT_ROUNDS)

  // Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    phone,
    workType
  })

  // Generate token
  const token = generateToken(user._id)

  // Remove password from response
  user.password = undefined

  res.status(201).json({
    message: SUCCESS_MESSAGES.REGISTER_SUCCESS,
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      workType: user.workType
    }
  })
})

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  // Validate input
  if (!email || !password) {
    throw new AppError(ERRORS.VALIDATION_ERROR, 400)
  }

  // Find user and select password
  const user = await User.findOne({ email }).select('+password')
  if (!user) {
    throw new AppError(ERRORS.INVALID_CREDENTIALS, 401)
  }

  // Compare password
  const isPasswordCorrect = await bcrypt.compare(password, user.password)
  if (!isPasswordCorrect) {
    throw new AppError(ERRORS.INVALID_CREDENTIALS, 401)
  }

  // Generate token
  const token = generateToken(user._id)

  // Remove password from response
  user.password = undefined

  res.json({
    message: SUCCESS_MESSAGES.LOGIN_SUCCESS,
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      workType: user.workType,
      riskScore: user.riskScore
    }
  })
})

export const logout = asyncHandler(async (req, res) => {
  res.json({ message: SUCCESS_MESSAGES.LOGOUT_SUCCESS })
})

export const refreshToken = asyncHandler(async (req, res) => {
  const { id } = req.user

  const user = await User.findById(id)
  if (!user) {
    throw new AppError(ERRORS.NOT_FOUND, 404)
  }

  const token = generateToken(user._id)

  res.json({
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email
    }
  })
})

export default { register, login, logout, refreshToken }
