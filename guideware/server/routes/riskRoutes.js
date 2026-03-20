import express from 'express'
import * as riskController from '../controllers/riskController.js'
import { authMiddleware } from '../middleware/authMiddleware.js'

const router = express.Router()

// All routes require authentication
router.use(authMiddleware)

router.get('/:userId', riskController.getRiskAssessment)
router.post('/evaluate', riskController.evaluateRisk)
router.put('/:userId/profile', riskController.updateRiskProfile)
router.get('/:userId/history', riskController.getRiskHistory)

export default router
