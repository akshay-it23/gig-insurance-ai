import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import dotenv from 'dotenv'
import connectDB from './config/database.js'
import { config } from './config/environment.js'
import { logger } from './middleware/logger.js'
import { errorHandler } from './middleware/errorHandler.js'
import apiRoutes from './routes/index.js'

dotenv.config()

// Initialize app
const app = express()

// Connect to database
connectDB()

// Middleware
app.use(helmet())
app.use(cors({
  origin: config.FRONTEND_URL,
  credentials: true
}))
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ limit: '10mb', extended: true }))
app.use(logger)

// API Routes
app.use('/api', apiRoutes)

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  })
})

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' })
})

// Error handler
app.use(errorHandler)

// Start server
const PORT = config.PORT
app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════════════════════╗
║                    GigShield Backend                       ║
║                                                            ║
║  Server running on http://localhost:${PORT}              ║
║  Environment: ${config.NODE_ENV}                          ║
║  Database: ${config.MONGODB_URI}                          ║
╚════════════════════════════════════════════════════════════╝
  `)
})

export default app
