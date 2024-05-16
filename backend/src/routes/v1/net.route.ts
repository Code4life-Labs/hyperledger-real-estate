import express from 'express'
import { UserValidation } from '../../validations/user.validation'
import { NetController } from '../../controllers/net.controller'

const router = express.Router()

/**
 * Body: {
 *   username: string,
 *   password: string,
 *   attrs: any
 * }
 */
router
.route('/user')
.post(NetController.register)

/**
 * Body: {}
 */
router
.route('/admin')
.post(NetController.enrollAdmin)

/**
 * Body: {
 *   username: string
 * }
 */
router
.route('/real-estates')
.post(NetController.listRealEstates)

/**
 * Params: {
 *   id: string
 * }
 * 
 * Body: {
 *   username: string
 * }
 */
router
.route('/real-estate/:id')
.post(NetController.getRealEstate)

/**
 * Body: {
 *   username: string,
 *   data: {
 *     id: string,
 *     ownerIds: Array<string>,
 *     imgs: Array<string>,
 *     length: string,
 *     width: string,
 *     parts: string,
 *     no: string,
 *     localNo: string
 *   }
 * }
 */
router
.route('/real-estate')
.post(NetController.createRealEstate)

/**
 * Body: {
 *   username: string,
 *   data: {
 *     id: string,
 *     ownerIds?: Array<string>,
 *     imgs?: Array<string>,
 *     length?: string,
 *     width?: string,
 *     parts?: string,
 *     no?: string,
 *     localNo?: string
 *   }
 * }
 */
router
.route('/real-estate')
.patch(NetController.patchRealEstate)

export const netRoutes = router