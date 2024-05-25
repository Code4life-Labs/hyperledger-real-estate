import express from 'express'
import { NetController } from '../../controllers/net.controller'

// Import middlewares
import { AuthMiddleware } from '../../middlewares/auth.middleware'

const router = express.Router()

// ROUTES ARE USED IN INITIALIZATION & SHUTDOWN PHRASE
// TODO: Enroll 2 admins to CA Server
router
  .route('/admin')
  .post(NetController.enrollAdmin)

// TODO: Add 10 records of real estate to Ledger
router
  .route('/init')
  .post(NetController.initializeRealEstates)

// TODO: Clear all data that relate to real estate, net including users, wallet's identities.
router
  .route('/clear')
  .delete(NetController.clearAll)

// END OF THEM

/**
 * Headers: {
 *   authorization: "***"
 * },
 * 
 * Body: {
 *   username: string,
 *   password: string,
 *   firstName: string,
 *   lastName: string,
 *   birthDate: string
 * }
 */
// TODO: Add new user
// Add to Register & Enroll to CA
// Add to MongoDB
router
  .route('/user')
  .post(AuthMiddleware.authorizeAdmin, NetController.register)

/**
 * Headers: {
 *   authorization: "***"
 * }
 */
// TODO: Get multiple real estate data
router
  .route('/real-estates')
  .get(AuthMiddleware.authorizeUser, NetController.listRealEstates)

/**
 * Headers: {
 *   authorization: "***"
 * },
 * 
 * Params: {
 *   id: string
 * }
 */
// TODO: Get one real estate data
router
  .route('/real-estates/:id')
  .get(AuthMiddleware.authorizeUser, NetController.getRealEstate)

/**
 * Headers: {
 *   authorization: "***"
 * },
 * 
 * Body: {
 *   id: string,
 *   ownerIds: Array<string>,
 *   imgs: Array<string>,
 *   area: string,
 *   parts: string,
 *   no: string,
 *   localNo: string
 * }
 */
// TODO: Add new real estate
router
  .route('/real-estate')
  .post(AuthMiddleware.authorizeUser, NetController.createRealEstate)

/**
 * Headers: {
 *   authorization: "***"
 * },
 * 
 * Body: {
 *   id: string,
 *   ownerIds: Array<string>,
 *   imgs: Array<string>,
 *   area: string,
 *   parts: string,
 *   no: string,
 *   localNo: string
 * }
 */
// TODO: Update new real estate
router
  .route('/real-estate')
  .patch(AuthMiddleware.authorizeUser, NetController.patchRealEstate)

export const netRoutes = router