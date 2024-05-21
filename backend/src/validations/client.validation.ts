import { NextFunction, Request, Response } from 'express'
import { clientSchema } from '../schemas/client.schema'
import { HttpStatusCode } from '../assets/utilities/constants'


const addEditClient = async (req: Request, res: Response, next: NextFunction) => {
  const condition = clientSchema.addEditClientSchema
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


export const ClientValidation = {
  addEditClient
}
