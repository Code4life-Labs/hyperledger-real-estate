import { NextFunction, Request, Response } from 'express'
import { HttpStatusCode } from '../assets/utilities/constants'
import { identitySchema } from '../schemas/identity.schema'

const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  const condition = identitySchema.authenticateSchema
  try {
    await condition.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    if (error instanceof Error) {
      res.status(HttpStatusCode.BAD_REQUEST).json({
        errors: error
      })
    }
  }
}

export const IdentityValidation = {
  authenticate,
}
