import express from 'express'
import { UserController } from '../../controllers/user.controller'
import { AuthMiddleware } from '../../middlewares/auth.middleware'

const router = express.Router()

// TODO: Get users
router.route('/users')
  .get(AuthMiddleware.authorizeAdmin, UserController.getUsers)

// TODO: Get user with ID
router.route('/users/:id')
  .get(AuthMiddleware.authorizeAdmin, UserController.getUserById)

// TODO: Edit user with ID
router.route('/users/:id')
  .patch(AuthMiddleware.authorizeAdmin, UserController.updateUserById)

export const userRoutes = router