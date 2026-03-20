import { validationResult } from 'express-validator'
import { ERRORS } from '../config/constants.js'

export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: ERRORS.VALIDATION_ERROR,
      details: errors.array()
    })
  }
  next()
}

export const validateEmail = (email) => {
  const re = /^[\w\.-]+@[\w\.-]+\.\w+$/
  return re.test(email)
}

export const validatePassword = (password) => {
  return password.length >= 8
}

export default handleValidationErrors
