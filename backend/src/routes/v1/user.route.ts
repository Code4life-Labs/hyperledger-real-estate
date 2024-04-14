import express from 'express'
import { UserValidation } from '../../validations/user.validation'
import { UserController } from '../../controllers/user.controller'

const router = express.Router()

router.route('/sign-up')
  .post(UserValidation.registerUser, UserController.registerUser)

export const userRoutes = router
