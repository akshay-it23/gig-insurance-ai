// Validate email
export const isValidEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

// Alias for isValidEmail
export const validateEmail = isValidEmail

// Validate password (min 8 chars, at least 1 uppercase, 1 lowercase, 1 number)
export const isValidPassword = (password) => {
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/
  return re.test(password)
}

// Alias for isValidPassword
export const validatePassword = isValidPassword

// Validate phone
export const isValidPhone = (phone) => {
  const re = /^[\d\-\+\(\)\s]+$/
  return re.test(phone) && phone.replace(/\D/g, '').length >= 10
}

// Validate required fields
export const validateRequired = (value) => {
  return value && value.trim() !== ''
}

// Validate min length
export const validateMinLength = (value, min) => {
  return value && value.length >= min
}

// Validate max length
export const validateMaxLength = (value, max) => {
  return value && value.length <= max
}

// Validate number range
export const validateNumberRange = (value, min, max) => {
  const num = Number(value)
  return num >= min && num <= max
}

// Validate form data
export const validateFormData = (data, rules) => {
  const errors = {}

  for (const field in rules) {
    const value = data[field]
    const rule = rules[field]

    if (rule.required && !validateRequired(value)) {
      errors[field] = `${rule.label || field} is required`
      continue
    }

    if (rule.email && !isValidEmail(value)) {
      errors[field] = 'Please enter a valid email'
      continue
    }

    if (rule.password && !isValidPassword(value)) {
      errors[field] = 'Password must be at least 8 characters with uppercase, lowercase, and number'
      continue
    }

    if (rule.minLength && !validateMinLength(value, rule.minLength)) {
      errors[field] = `${rule.label || field} must be at least ${rule.minLength} characters`
      continue
    }

    if (rule.maxLength && !validateMaxLength(value, rule.maxLength)) {
      errors[field] = `${rule.label || field} must not exceed ${rule.maxLength} characters`
      continue
    }

    if (rule.pattern && !rule.pattern.test(value)) {
      errors[field] = rule.patternMessage || 'Invalid format'
      continue
    }
  }

  return errors
}
