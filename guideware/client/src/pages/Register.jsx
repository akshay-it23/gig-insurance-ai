import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Input, Select } from '../components/Input'
import Button from '../components/Button'
import Alert from '../components/Alert'
import { validateEmail, validateFormData } from '../utils/validators'
import { GIG_TYPES } from '../utils/constants'
import authService from '../services/authService'

const Register = () => {
  const navigate = useNavigate()
  const { register: registerUser, setError: setAuthError } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    gigType: '',
    acceptTerms: false
  })

  const [errors, setErrors] = useState({})

  const gigTypeOptions = Object.entries(GIG_TYPES).map(([key, value]) => ({
    label: key.charAt(0) + key.slice(1).toLowerCase(),
    value
  }))

  const validateForm = () => {
    const validationRules = {
      name: { required: true, label: 'Name', minLength: 2 },
      email: { required: true, label: 'Email', email: true },
      phone: { required: true, label: 'Phone', pattern: /^[\d\-\+\(\)\s]+$/, patternMessage: 'Invalid phone number' },
      password: { required: true, label: 'Password', password: true },
      gigType: { required: true, label: 'Work Type' }
    }

    const newErrors = validateFormData(formData, validationRules)

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'You must accept the terms and conditions'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    setLoading(true)
    setError('')
    setSuccess('')

    try {
      const response = await authService.register({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        workType: formData.gigType
      })

      if (response.token && response.user) {
        registerUser(response.user, response.token)
        setSuccess('Registration successful! Redirecting...')
        setTimeout(() => navigate('/dashboard'), 1500)
      }
    } catch (err) {
      const errorMessage = typeof err === 'string' ? err : err?.message || 'Registration failed. Please try again.'
      setError(errorMessage)
      setAuthError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center p-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center gap-2">
            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
              <span className="text-blue-600 font-bold text-2xl">G</span>
            </div>
            <span className="text-white text-2xl font-bold">GigShield</span>
          </div>
          <p className="text-blue-100 mt-2">Get insured in minutes</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-lg shadow-xl p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Create Account</h1>

          {error && <Alert type="danger" message={error} onClose={() => setError('')} />}
          {success && <Alert type="success" message={success} />}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Full Name"
              type="text"
              name="name"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
              required
            />

            <Input
              label="Email"
              type="email"
              name="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              required
            />

            <Input
              label="Phone"
              type="tel"
              name="phone"
              placeholder="+1 (555) 123-4567"
              value={formData.phone}
              onChange={handleChange}
              error={errors.phone}
              required
            />

            <Select
              label="Work Type"
              name="gigType"
              value={formData.gigType}
              onChange={handleChange}
              options={gigTypeOptions}
              error={errors.gigType}
              required
            />

            <Input
              label="Password"
              type="password"
              name="password"
              placeholder="Enter strong password"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              required
            />

            <Input
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              placeholder="Confirm password"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
              required
            />

            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                name="acceptTerms"
                checked={formData.acceptTerms}
                onChange={handleChange}
                className="w-4 h-4 mt-1 rounded"
              />
              <label className="text-sm text-gray-600">
                I accept the{' '}
                <Link to="/terms" className="text-blue-600 hover:text-blue-700">
                  terms and conditions
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="text-blue-600 hover:text-blue-700">
                  privacy policy
                </Link>
              </label>
            </div>
            {errors.acceptTerms && (
              <p className="text-red-600 text-sm">{errors.acceptTerms}</p>
            )}

            <Button
              type="submit"
              size="lg"
              className="w-full mt-6"
              disabled={loading}
            >
              {loading ? 'Creating account...' : 'Register'}
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-center text-gray-600 text-sm">
              Already have an account?{' '}
              <Link to="/login" className="text-blue-600 hover:text-blue-700 font-medium">
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
