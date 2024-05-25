import express from 'express'
import { IdentityValidation } from '../../validations/identity.validation'
import { IdentityController } from '../../controllers/identity.controller'

const router = express.Router()

router.route('/auth')
  .post(IdentityValidation.authenticate, IdentityController.authenticate)

router.route('/verify')
  .get(IdentityController.verify)

export const identityRoutes = router
