import mongoose from 'mongoose'

const riskAssessmentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    riskScore: {
      type: Number,
      required: true,
      min: 0,
      max: 100
    },
    riskCategory: {
      type: String,
      enum: ['LOW', 'MEDIUM', 'HIGH'],
      required: true
    },
    factors: {
      workType: String,
      experienceYears: Number,
      incidentHistory: Number,
      claimFrequency: Number,
      locationRisk: String,
      weeklyHours: Number
    },
    recommendedCoverage: [String],
    recommendedPremium: Number,
    assessmentDate: {
      type: Date,
      default: Date.now
    },
    nextReviewDate: {
      type: Date,
      required: true
    },
    evaluatedBy: {
      type: String,
      default: 'ML Model'
    },
    confidence: {
      type: Number,
      min: 0,
      max: 1,
      default: 0.85
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
)

export default mongoose.model('RiskAssessment', riskAssessmentSchema)
