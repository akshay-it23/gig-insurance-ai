import express from 'express'
import * as policyController from '../controllers/policyController.js'
import { authMiddleware } from '../middleware/authMiddleware.js'

const router = express.Router()

// All routes require authentication
router.use(authMiddleware)

router.get('/', policyController.getAllPolicies)
router.post('/', policyController.createPolicy)
router.get('/:id', policyController.getPolicyById)
router.put('/:id', policyController.updatePolicy)
router.delete('/:id', policyController.deletePolicy)
router.post('/:id/renew', policyController.renewPolicy)
router.post('/:id/cancel', policyController.cancelPolicy)

export default router
