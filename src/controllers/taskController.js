import Task from '../models/Task.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import { buildPagination } from '../utils/pagination.js'
import ApiError from '../utils/ApiError.js'

export const createTask = asyncHandler(async (req, res) => {
  const task = await Task.create({ ...req.body, user: req.user._id })
  res.status(201).json(task)
})

export const listTasks = asyncHandler(async (req, res) => {
  const { status, priority, q } = req.query
  const { page, limit, skip } = buildPagination(req.query)

  const filter = { user: req.user._id }
  if (status) filter.status = status
  if (priority) filter.priority = priority
  if (q) filter.title = { $regex: q, $options: 'i' }

  const [results, total] = await Promise.all([
    Task.find(filter).sort({ updatedAt: -1 }).skip(skip).limit(limit),
    Task.countDocuments(filter)
  ])

  res.json({ results, total, page, limit, totalPages: Math.ceil(total / limit) })
})

export const getTask = asyncHandler(async (req, res) => {
  const task = await Task.findOne({ _id: req.params.id, user: req.user._id })
  if (!task) throw new ApiError(404, 'Task not found')
  res.json(task)
})

export const updateTask = asyncHandler(async (req, res) => {
  const task = await Task.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id },
    { $set: req.body },
    { new: true }
  )
  if (!task) throw new ApiError(404, 'Task not found')
  res.json(task)
})

export const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user._id })
  if (!task) throw new ApiError(404, 'Task not found')
  res.json({ message: 'Task deleted' })
})
