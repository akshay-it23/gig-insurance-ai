import mongoose from 'mongoose'

const claimSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    policyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Policy',
      required: true
    },
    claimNumber: {
      type: String,
      unique: true,
      required: true
    },
    type: {
      type: String,
      required: true,
      enum: ['accident', 'injury', 'property_damage', 'loss_of_income', 'medical']
    },
    description: {
      type: String,
      required: true
    },
    amount: {
      type: Number,
      required: [true, 'Claim amount is required'],
      min: 0
    },
    status: {
      type: String,
      enum: ['draft', 'submitted', 'under_review', 'approved', 'rejected', 'paid', 'partial_paid'],
      default: 'draft'
    },
    approvedAmount: {
      type: Number,
      default: 0
    },
    rejectionReason: {
      type: String,
      default: null
    },
    documents: [
      {
        name: String,
        url: String,
        uploadedAt: {
          type: Date,
          default: Date.now
        }
      }
    ],
    notes: [
      {
        author: mongoose.Schema.Types.ObjectId,
        text: String,
        createdAt: {
          type: Date,
          default: Date.now
        }
      }
    ],
    submittedAt: {
      type: Date,
      default: null
    },
    reviewedAt: {
      type: Date,
      default: null
    },
    reviewedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null
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

export default mongoose.model('Claim', claimSchema)
