import { NextFunction, Request, Response } from 'express'
import { userSchema } from '../schemas/user.schema'
import { HttpStatusCode } from '../assets/utilities/constants'

const registerUser = async (req: Request, res: Response, next: NextFunction) => {
  const condition = userSchema.registerSchema
  try {
    console.log('Start validate')
    await condition.validateAsync(req.body, { abortEarly: false })
    console.log('Pass validate')
    next()
  } catch (error) {
    if (error instanceof Error) {
      res.status(HttpStatusCode.BAD_REQUEST).json({
        errors: error
      })
    }
  }
}

export const UserValidation = {
  registerUser
}
