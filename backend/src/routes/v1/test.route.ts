import express from 'express'
import { UserValidation } from '../../validations/user.validation'
import { TestController } from '../../controllers/test.controller'

const router = express.Router()

/**
 * Body: {
 *   username: string
 * }
 */
router
.route('/accounts')
.post(TestController.listAccounts)

/**
 * Body: {
 *   username: string,
 *   balance: number
 * }
 */
router
.route('/account')
.post(TestController.createAccount)

/**
 * Body: {
 *   username: string,
 *   password: string,
 *   attrs: any
 * }
 */
router
.route('/user')
.post(TestController.register)

/**
 * Body: {}
 */
router
.route('/admin')
.post(TestController.enrollAdmin)

export const testRoutes = router