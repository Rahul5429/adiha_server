import { body, param, query } from 'express-validator'
import mongoose from 'mongoose'

export const createTaskValidator = [
  body('title').notEmpty().withMessage('Title required'),
  body('description').notEmpty().withMessage('Description required'),
  body('status').optional().isIn(['completed', 'incomplete']),
  body('priority').optional().isIn(['low', 'medium', 'high']),
  body('deadline').optional().isISO8601().toDate()
]

export const updateTaskValidator = [
  param('id').custom((v) => mongoose.isValidObjectId(v)).withMessage('Invalid ID'),
  body('title').optional().notEmpty(),
  body('description').optional().notEmpty(),
  body('status').optional().isIn(['completed', 'incomplete']),
  body('priority').optional().isIn(['low', 'medium', 'high']),
  body('deadline').optional().isISO8601().toDate()
]

export const listTasksValidator = [
  query('status').optional().isIn(['completed', 'incomplete']),
  query('priority').optional().isIn(['low', 'medium', 'high']),
  query('page').optional().isInt({ min: 1 }),
  query('limit').optional().isInt({ min: 1, max: 50 })
]

export const idParamValidator = [
  param('id').custom((v) => mongoose.isValidObjectId(v)).withMessage('Invalid ID')
]
