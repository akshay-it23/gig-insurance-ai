import express from 'express'
import * as userController from '../controllers/userController.js'
import { authMiddleware } from '../middleware/authMiddleware.js'

const router = express.Router()

// All routes require authentication
router.use(authMiddleware)

router.get('/profile', userController.getProfile)
router.put('/profile', userController.updateProfile)
router.post('/change-password', userController.changePassword)
router.get('/settings', userController.getSettings)
router.put('/settings', userController.updateSettings)

export default router
