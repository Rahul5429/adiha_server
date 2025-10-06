import { Router } from 'express'
import { signup, login, me, logout } from '../controllers/authController.js'
import { validate } from '../middleware/validate.js'
import { signupValidator, loginValidator } from '../validators/authValidators.js'
import { protect } from '../middleware/auth.js'

const router = Router()

router.post('/signup', validate(signupValidator), signup)
router.post('/login', validate(loginValidator), login)
router.get('/me', protect, me)
router.post('/logout', protect, logout)

export default router
