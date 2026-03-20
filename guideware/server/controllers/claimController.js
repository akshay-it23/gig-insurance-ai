import Claim from '../models/Claim.js'
import { asyncHandler, AppError } from '../middleware/errorHandler.js'
import { ERRORS, SUCCESS_MESSAGES } from '../config/constants.js'
import { v4 as uuidv4 } from 'uuid'

export const getAllClaims = asyncHandler(async (req, res) => {
  const { status } = req.query
  const filter = { userId: req.user.id }

  if (status) {
    filter.status = status
  }

  const claims = await Claim.find(filter).sort({ createdAt: -1 }).populate('policyId')

  res.json({
    data: claims,
    count: claims.length
  })
})

export const getClaimById = asyncHandler(async (req, res) => {
  const claim = await Claim.findById(req.params.id).populate('policyId')

  if (!claim) {
    throw new AppError(ERRORS.NOT_FOUND, 404)
  }

  if (claim.userId.toString() !== req.user.id) {
    throw new AppError(ERRORS.FORBIDDEN, 403)
  }

  res.json({ data: claim })
})

export const createClaim = asyncHandler(async (req, res) => {
  const { policyId, type, description, amount } = req.body

  if (!policyId || !type || !description || !amount) {
    throw new AppError(ERRORS.VALIDATION_ERROR, 400)
  }

  const claimNumber = `CLM-${Date.now()}-${uuidv4().slice(0, 8)}`

  const claim = await Claim.create({
    userId: req.user.id,
    policyId,
    claimNumber,
    type,
    description,
    amount,
    status: 'draft'
  })

  res.status(201).json({
    message: SUCCESS_MESSAGES.CLAIM_FILED,
    data: claim
  })
})

export const updateClaim = asyncHandler(async (req, res) => {
  const claim = await Claim.findById(req.params.id)

  if (!claim) {
    throw new AppError(ERRORS.NOT_FOUND, 404)
  }

  if (claim.userId.toString() !== req.user.id) {
    throw new AppError(ERRORS.FORBIDDEN, 403)
  }

  if (claim.status !== 'draft') {
    throw new AppError('Can only edit draft claims', 400)
  }

  Object.assign(claim, req.body)
  claim.updatedAt = new Date()
  await claim.save()

  res.json({
    message: 'Claim updated successfully',
    data: claim
  })
})

export const deleteClaim = asyncHandler(async (req, res) => {
  const claim = await Claim.findById(req.params.id)

  if (!claim) {
    throw new AppError(ERRORS.NOT_FOUND, 404)
  }

  if (claim.userId.toString() !== req.user.id) {
    throw new AppError(ERRORS.FORBIDDEN, 403)
  }

  await Claim.deleteOne({ _id: req.params.id })

  res.json({ message: 'Claim deleted successfully' })
})

export const submitClaim = asyncHandler(async (req, res) => {
  const claim = await Claim.findById(req.params.id)

  if (!claim) {
    throw new AppError(ERRORS.NOT_FOUND, 404)
  }

  if (claim.userId.toString() !== req.user.id) {
    throw new AppError(ERRORS.FORBIDDEN, 403)
  }

  claim.status = 'submitted'
  claim.submittedAt = new Date()
  await claim.save()

  res.json({
    message: 'Claim submitted successfully',
    data: claim
  })
})

export const approveClaim = asyncHandler(async (req, res) => {
  const { approvedAmount, notes } = req.body
  const claim = await Claim.findById(req.params.id)

  if (!claim) {
    throw new AppError(ERRORS.NOT_FOUND, 404)
  }

  claim.status = 'approved'
  claim.approvedAmount = approvedAmount || claim.amount
  claim.reviewedAt = new Date()
  claim.reviewedBy = req.user.id

  if (notes) {
    claim.notes.push({
      author: req.user.id,
      text: notes
    })
  }

  await claim.save()

  res.json({
    message: 'Claim approved successfully',
    data: claim
  })
})

export const rejectClaim = asyncHandler(async (req, res) => {
  const { reason } = req.body
  const claim = await Claim.findById(req.params.id)

  if (!claim) {
    throw new AppError(ERRORS.NOT_FOUND, 404)
  }

  claim.status = 'rejected'
  claim.rejectionReason = reason
  claim.reviewedAt = new Date()
  claim.reviewedBy = req.user.id

  await claim.save()

  res.json({
    message: 'Claim rejected',
    data: claim
  })
})

export default {
  getAllClaims,
  getClaimById,
  createClaim,
  updateClaim,
  deleteClaim,
  submitClaim,
  approveClaim,
  rejectClaim
}
