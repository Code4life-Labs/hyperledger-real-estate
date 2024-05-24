import express from 'express'
import { ClientController } from '../../controllers/client.controller'
import { AuthMiddleware } from '../../middlewares/auth.middleware'
import { ClientValidation } from '../../validations/client.validation'

const router = express.Router()

// TODO: Get clients
router.route('/clients')
  .get(AuthMiddleware.authorizeUser, ClientController.getClients)

// TODO: Get client with ID
router.route('/clients/:id')
  .get(AuthMiddleware.authorizeUser, ClientController.getClientById)

// TODO: Edit client with ID
router.route('/clients/:id')
  .patch(AuthMiddleware.authorizeUser, ClientValidation.addEditClient, ClientController.updateClientById)

// TODO: Add new client
router.route('/client')
  .post(AuthMiddleware.authorizeUser, ClientValidation.addEditClient, ClientController.addClient)

export const clientRoutes = router