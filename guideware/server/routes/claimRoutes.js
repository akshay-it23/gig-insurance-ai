import express from 'express'
import * as claimController from '../controllers/claimController.js'
import { authMiddleware } from '../middleware/authMiddleware.js'

const router = express.Router()

// All routes require authentication
router.use(authMiddleware)

router.get('/', claimController.getAllClaims)
router.post('/', claimController.createClaim)
router.get('/:id', claimController.getClaimById)
router.put('/:id', claimController.updateClaim)
router.delete('/:id', claimController.deleteClaim)
router.post('/:id/submit', claimController.submitClaim)
router.post('/:id/approve', claimController.approveClaim)
router.post('/:id/reject', claimController.rejectClaim)

export default router
