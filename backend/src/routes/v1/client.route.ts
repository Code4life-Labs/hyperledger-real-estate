import express from 'express'
import { ClientController } from '../../controllers/client.controller'
import { AuthMiddleware } from '../../middlewares/auth.middleware'
import { ClientValidation } from '../../validations/client.validation'

const router = express.Router()

router.route('/:id')
  .get(AuthMiddleware.isAuthorized, ClientController.getClient)

router.route('/edit/:id')
  .patch(AuthMiddleware.isAuthorized, ClientValidation.addEditClient, ClientController.editClient)

router.route('/add')
  .post(AuthMiddleware.isAuthorized, ClientValidation.addEditClient, ClientController.addClient)

export const clientRoutes = router
