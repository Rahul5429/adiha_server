import { validationResult } from 'express-validator'
import ApiError from '../utils/ApiError.js'

export const validate = (validators) => [
  ...validators,
  (req, _res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      const msg = errors.array().map(e => e.msg).join(', ')
      return next(new ApiError(400, msg))
    }
    next()
  }
]
