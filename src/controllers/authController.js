import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import ApiError from '../utils/ApiError.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import { env } from '../config/env.js'

const signToken = (id) => jwt.sign({ id }, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRES_IN })

export const signup = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  const exists = await User.findOne({ email })
  if (exists) throw new ApiError(409, 'Email already exists')

  const user = await User.create({ email, password })
  const token = signToken(user._id)
  res.status(201).json({ token, user: { _id: user._id, email: user.email } })
})

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (!user || !(await user.comparePassword(password))) throw new ApiError(401, 'Invalid credentials')

  const token = signToken(user._id)
  res.json({ token, user: { _id: user._id, email: user.email } })
})

export const me = asyncHandler(async (req, res) => {
  res.json({ user: req.user })
})

export const logout = asyncHandler(async (_req, res) => {
  res.json({ message: 'Logged out (client must delete token)' })
})
