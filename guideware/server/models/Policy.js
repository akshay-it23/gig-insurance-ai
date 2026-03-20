import mongoose from 'mongoose'

const policySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    name: {
      type: String,
      required: [true, 'Policy name is required'],
      trim: true
    },
    type: {
      type: String,
      required: true,
      enum: ['accident', 'liability', 'medical', 'equipment', 'business_loss']
    },
    description: {
      type: String,
      default: ''
    },
    coverage: {
      type: Number,
      required: [true, 'Coverage amount is required'],
      min: 0
    },
    premium: {
      type: Number,
      required: [true, 'Premium amount is required'],
      min: 0
    },
    status: {
      type: String,
      enum: ['active', 'inactive', 'expired', 'cancelled', 'pending'],
      default: 'active'
    },
    startDate: {
      type: Date,
      required: true
    },
    expiryDate: {
      type: Date,
      required: true
    },
    renewalDate: {
      type: Date,
      default: null
    },
    terms: {
      deductible: Number,
      coinsurance: Number,
      maxClaimAmount: Number
    },
    documents: [String],
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

export default mongoose.model('Policy', policySchema)
