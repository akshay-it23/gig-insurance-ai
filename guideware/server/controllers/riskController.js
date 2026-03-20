import RiskAssessment from '../models/RiskAssessment.js'
import User from '../models/User.js'
import { asyncHandler, AppError } from '../middleware/errorHandler.js'
import { ERRORS } from '../config/constants.js'
import axios from 'axios'
import { config } from '../config/environment.js'

export const getRiskAssessment = asyncHandler(async (req, res) => {
  const { userId } = req.params

  // Verify user can only access their own assessment
  if (userId !== req.user.id && req.user.role !== 'admin') {
    throw new AppError(ERRORS.FORBIDDEN, 403)
  }

  const assessment = await RiskAssessment.findOne({ userId }).sort({ createdAt: -1 })

  if (!assessment) {
    // Return default assessment if none exists
    return res.json({
      data: {
        riskScore: 50,
        riskCategory: 'MEDIUM',
        factors: {},
        recommendedCoverage: ['medical', 'liability']
      }
    })
  }

  res.json({ data: assessment })
})

export const evaluateRisk = asyncHandler(async (req, res) => {
  const { workType, hoursPerWeek, location, experienceYears } = req.body

  if (!workType || !hoursPerWeek) {
    throw new AppError(ERRORS.VALIDATION_ERROR, 400)
  }

  const user = await User.findById(req.user.id)
  if (!user) {
    throw new AppError(ERRORS.NOT_FOUND, 404)
  }

  try {
    // Call ML API for risk assessment
    const mlResponse = await axios.post(`${config.ML_API_URL}/api/ml/risk-assessment`, {
      workType,
      hoursPerWeek,
      location,
      experienceYears
    })

    const { riskScore, riskCategory, recommendedCoverage } = mlResponse.data

    // Save assessment
    const assessment = await RiskAssessment.create({
      userId: req.user.id,
      riskScore,
      riskCategory,
      factors: {
        workType,
        experienceYears,
        weeklyHours: hoursPerWeek,
        locationRisk: location
      },
      recommendedCoverage,
      nextReviewDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)
    })

    // Update user risk score
    user.riskScore = riskScore
    await user.save()

    res.json({
      message: 'Risk assessment completed',
      data: assessment
    })
  } catch (error) {
    // Fallback if ML API is not available
    const riskScore = calculateFallbackRisk(workType, hoursPerWeek, experienceYears)
    const riskCategory = riskScore <= 30 ? 'LOW' : riskScore <= 70 ? 'MEDIUM' : 'HIGH'

    const assessment = await RiskAssessment.create({
      userId: req.user.id,
      riskScore,
      riskCategory,
      factors: { workType, experienceYears, weeklyHours: hoursPerWeek, locationRisk: location },
      recommendedCoverage: ['medical', 'liability'],
      evaluatedBy: 'Fallback Algorithm'
    })

    res.json({
      message: 'Risk assessment completed',
      data: assessment
    })
  }
})

export const updateRiskProfile = asyncHandler(async (req, res) => {
  const { userId } = req.params
  const { factors } = req.body

  if (userId !== req.user.id) {
    throw new AppError(ERRORS.FORBIDDEN, 403)
  }

  const assessment = await RiskAssessment.findOneAndUpdate(
    { userId },
    { factors, updatedAt: new Date() },
    { new: true }
  )

  if (!assessment) {
    throw new AppError(ERRORS.NOT_FOUND, 404)
  }

  res.json({
    message: 'Risk profile updated',
    data: assessment
  })
})

export const getRiskHistory = asyncHandler(async (req, res) => {
  const { userId } = req.params

  if (userId !== req.user.id) {
    throw new AppError(ERRORS.FORBIDDEN, 403)
  }

  const history = await RiskAssessment.find({ userId }).sort({ createdAt: -1 }).limit(10)

  res.json({
    data: history,
    count: history.length
  })
})

// Helper function for fallback risk calculation
const calculateFallbackRisk = (workType, hoursPerWeek, experienceYears) => {
  let baseScore = 50

  // Adjust based on work type
  const riskMultiplier = {
    delivery: 1.3,
    rideshare: 1.4,
    freelance: 0.8,
    tutor: 0.6,
    handyman: 1.2,
    other: 1.0
  }

  baseScore *= (riskMultiplier[workType] || 1.0)

  // Adjust based on hours
  if (hoursPerWeek > 50) baseScore += 15
  else if (hoursPerWeek < 20) baseScore -= 10

  // Adjust based on experience
  if (experienceYears > 5) baseScore -= 20
  else if (experienceYears < 1) baseScore += 15

  return Math.min(100, Math.max(0, Math.round(baseScore)))
}

export default {
  getRiskAssessment,
  evaluateRisk,
  updateRiskProfile,
  getRiskHistory
}
