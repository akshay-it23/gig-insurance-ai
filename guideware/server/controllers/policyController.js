import Policy from '../models/Policy.js'
import { asyncHandler, AppError } from '../middleware/errorHandler.js'
import { ERRORS, SUCCESS_MESSAGES } from '../config/constants.js'

export const getAllPolicies = asyncHandler(async (req, res) => {
  const { status } = req.query
  const filter = { userId: req.user.id }

  if (status) {
    filter.status = status
  }

  const policies = await Policy.find(filter).sort({ createdAt: -1 })

  res.json({
    data: policies,
    count: policies.length
  })
})

export const getPolicyById = asyncHandler(async (req, res) => {
  const policy = await Policy.findById(req.params.id)

  if (!policy) {
    throw new AppError(ERRORS.NOT_FOUND, 404)
  }

  if (policy.userId.toString() !== req.user.id) {
    throw new AppError(ERRORS.FORBIDDEN, 403)
  }

  res.json({ data: policy })
})

export const createPolicy = asyncHandler(async (req, res) => {
  const { name, type, description, coverage, premium, startDate, expiryDate, terms } = req.body

  if (!name || !type || !coverage || !premium) {
    throw new AppError(ERRORS.VALIDATION_ERROR, 400)
  }

  const policy = await Policy.create({
    userId: req.user.id,
    name,
    type,
    description,
    coverage,
    premium,
    startDate: startDate || new Date(),
    expiryDate: expiryDate || new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
    terms
  })

  res.status(201).json({
    message: SUCCESS_MESSAGES.POLICY_CREATED,
    data: policy
  })
})

export const updatePolicy = asyncHandler(async (req, res) => {
  const policy = await Policy.findById(req.params.id)

  if (!policy) {
    throw new AppError(ERRORS.NOT_FOUND, 404)
  }

  if (policy.userId.toString() !== req.user.id) {
    throw new AppError(ERRORS.FORBIDDEN, 403)
  }

  Object.assign(policy, req.body)
  policy.updatedAt = new Date()
  await policy.save()

  res.json({
    message: SUCCESS_MESSAGES.POLICY_UPDATED,
    data: policy
  })
})

export const deletePolicy = asyncHandler(async (req, res) => {
  const policy = await Policy.findById(req.params.id)

  if (!policy) {
    throw new AppError(ERRORS.NOT_FOUND, 404)
  }

  if (policy.userId.toString() !== req.user.id) {
    throw new AppError(ERRORS.FORBIDDEN, 403)
  }

  await Policy.deleteOne({ _id: req.params.id })

  res.json({ message: SUCCESS_MESSAGES.POLICY_DELETED })
})

export const renewPolicy = asyncHandler(async (req, res) => {
  const policy = await Policy.findById(req.params.id)

  if (!policy) {
    throw new AppError(ERRORS.NOT_FOUND, 404)
  }

  if (policy.userId.toString() !== req.user.id) {
    throw new AppError(ERRORS.FORBIDDEN, 403)
  }

  policy.renewalDate = new Date()
  policy.startDate = new Date()
  policy.expiryDate = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
  policy.status = 'active'
  await policy.save()

  res.json({
    message: 'Policy renewed successfully',
    data: policy
  })
})

export const cancelPolicy = asyncHandler(async (req, res) => {
  const { reason } = req.body
  const policy = await Policy.findById(req.params.id)

  if (!policy) {
    throw new AppError(ERRORS.NOT_FOUND, 404)
  }

  if (policy.userId.toString() !== req.user.id) {
    throw new AppError(ERRORS.FORBIDDEN, 403)
  }

  policy.status = 'cancelled'
  policy.documents = [...(policy.documents || []), `Cancellation reason: ${reason}`]
  await policy.save()

  res.json({
    message: 'Policy cancelled successfully',
    data: policy
  })
})

export default {
  getAllPolicies,
  getPolicyById,
  createPolicy,
  updatePolicy,
  deletePolicy,
  renewPolicy,
  cancelPolicy
}
