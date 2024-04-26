import express from 'express'

// Import from utils
import { userRoutes } from './user.route'
import { testRoutes } from './test.route'
import { HttpStatusCode } from '../../assets/utilities/constants'


const router = express.Router()

router.get('/status', (req, res) => res.status(HttpStatusCode.OK).json({ status: 'OK!' }))

// chatbot
router.use('/user', userRoutes)
router.use('/test', testRoutes)


export const apiV1 = router
