import ApiError from '../utils/ApiError.js'

export const notFound = (req, res, next) => {
  next(new ApiError(404, `Route not found: ${req.originalUrl}`))
}

export const errorHandler = (err, _req, res, _next) => {
  const status = err.statusCode || 500
  const message = err.message || 'Server Error'
  res.status(status).json({ status, message })
}
