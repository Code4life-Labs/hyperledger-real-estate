// Import services
import { UserService } from '../services/user.service'

// Import utils
import { HTTPUtils } from "../assets/utilities/http"

// Import types
import type { Request, Response } from 'express'

const registerUser = async (req: Request, res: Response) => {
  let code = 200;
  let data = null;
  let message = null;

  try {
    const result = await UserService.registerUser(req.body);
    data = { success: result };
  } catch (error: any) {
    if(code === 200) code = 500;
    data = { error: error.message };
    message = error.message;
  } finally {
    return res.status(code).json(HTTPUtils.generateHTTPResponse(code, data, message));
  }
}

export const UserController = {
  registerUser
}