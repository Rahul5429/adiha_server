import { Router } from 'express'
import { protect } from '../middleware/auth.js'
import { validate } from '../middleware/validate.js'
import {
  createTaskValidator,
  updateTaskValidator,
  listTasksValidator,
  idParamValidator
} from '../validators/taskValidators.js'
import {
  createTask,
  listTasks,
  getTask,
  updateTask,
  deleteTask
} from '../controllers/taskController.js'

const router = Router()

router.use(protect)

router.get('/', validate(listTasksValidator), listTasks)
router.post('/', validate(createTaskValidator), createTask)
router.get('/:id', validate(idParamValidator), getTask)
router.put('/:id', validate(updateTaskValidator), updateTask)
router.delete('/:id', validate(idParamValidator), deleteTask)

export default router
