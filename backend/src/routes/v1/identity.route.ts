import express from 'express'
import { IdentityValidation } from '../../validations/identity.validation'
import { IdentityController } from '../../controllers/identity.controller'

const router = express.Router()

router.route('/auth')
  .post(IdentityValidation.authenticate, IdentityController.authenticate)

export const identityRoutes = router
