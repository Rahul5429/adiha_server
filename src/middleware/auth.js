import jwt from 'jsonwebtoken'
import { env } from '../config/env.js'
import ApiError from '../utils/ApiError.js'
import User from '../models/User.js'

export const protect = async (req, _res, next) => {
  const header = req.headers.authorization || ''
  const token = header.startsWith('Bearer ') ? header.slice(7) : null
  if (!token) return next(new ApiError(401, 'Not authorized'))

  try {
    const payload = jwt.verify(token, env.JWT_SECRET)
    const user = await User.findById(payload.id).select('-password')
    if (!user) return next(new ApiError(401, 'User not found'))
    req.user = user
    next()
  } catch (e) {
    next(new ApiError(401, 'Invalid or expired token'))
  }
}
