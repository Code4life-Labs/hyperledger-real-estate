import express from 'express'
import { netRoutes } from './net.route'
import { HttpStatusCode } from '../../assets/utilities/constants'
import { clientRoutes } from './client.route'
import { identityRoutes } from './identity.route'

const router = express.Router()

router.get('/status', (req, res) => res.status(HttpStatusCode.OK).json({ status: 'OK!' }))
router.use('/net', netRoutes)
router.use('/client', clientRoutes)
router.use('/identity', identityRoutes)

export const apiV1 = router
