import mongoose from 'mongoose'
import { env } from './env.js'

mongoose.set('strictQuery', true)

mongoose.connect(env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message)
    process.exit(1)
  })
