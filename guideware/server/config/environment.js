import dotenv from 'dotenv'

dotenv.config()

export const config = {
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/gigshield',
  JWT_SECRET: process.env.JWT_SECRET || 'your-secret-key-change-in-production',
  JWT_EXPIRE: process.env.JWT_EXPIRE || '7d',
  ML_API_URL: process.env.ML_API_URL || 'http://localhost:5001',
  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:3000',
  BCRYPT_ROUNDS: 10
}

export default config
