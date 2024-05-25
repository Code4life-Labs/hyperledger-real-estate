import express from 'express'
import { HttpStatusCode } from '../../assets/utilities/constants'

// Import routes
import { userRoutes } from './user.route'
import { netRoutes } from './net.route'
import { clientRoutes } from './client.route'
import { identityRoutes } from './identity.route'

const router = express.Router()

router.get('/status', (req, res) => res.status(HttpStatusCode.OK).json({ status: 'OK!' }))
router.use('/net', netRoutes)
router.use('/', clientRoutes)
router.use('/', userRoutes)
router.use('/identity', identityRoutes)

export const apiV1 = router
