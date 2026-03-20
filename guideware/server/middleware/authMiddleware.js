import jwt from 'jsonwebtoken'
import { config } from '../config/environment.js'
import { ERRORS } from '../config/constants.js'

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1] || req.cookies?.token

    if (!token) {
      return res.status(401).json({ error: ERRORS.UNAUTHORIZED })
    }

    const decoded = jwt.verify(token, config.JWT_SECRET)
    req.user = decoded
    next()
  } catch (error) {
    return res.status(401).json({ error: ERRORS.UNAUTHORIZED })
  }
}

export const optionalAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1] || req.cookies?.token

    if (token) {
      const decoded = jwt.verify(token, config.JWT_SECRET)
      req.user = decoded
    }
    next()
  } catch (error) {
    // Continue without user
    next()
  }
}

export default authMiddleware
