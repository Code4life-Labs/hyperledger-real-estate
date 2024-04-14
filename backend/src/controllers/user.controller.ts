import { HttpStatusCode } from '../assets/utilities/constants'
import { UserService } from '../services/user.service'
import { Request, Response } from 'express'

const registerUser = async (req: Request, res: Response) => {
  try {
    const result = await UserService.registerUser(req.body)
    res.status(HttpStatusCode.OK).json(result)
  } catch (error) {
    if (error instanceof Error) {
      res.status(HttpStatusCode.INTERNAL_SERVER).json({
        errors: error.message
      })
    }
  }
}

export const UserController = {
  registerUser
}
