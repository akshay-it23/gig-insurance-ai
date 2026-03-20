import express from 'express'
import authRoutes from './authRoutes.js'
import userRoutes from './userRoutes.js'
import policyRoutes from './policyRoutes.js'
import claimRoutes from './claimRoutes.js'
import riskRoutes from './riskRoutes.js'

const router = express.Router()

router.use('/auth', authRoutes)
router.use('/users', userRoutes)
router.use('/policies', policyRoutes)
router.use('/claims', claimRoutes)
router.use('/assessment', riskRoutes)

// Health check endpoint
router.get('/health', (req, res) => {
  res.json({ status: 'Server is running' })
})

export default router
