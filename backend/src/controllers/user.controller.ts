
import { HTTPUtils } from "../assets/utilities/http"
import { UserService } from "../services/user.service";

// Import types
import type { Request, Response } from 'express'

const getUserById = async (req: Request, res: Response) => {
  let code = 200;
  let data = null;
  let message = null;

  try {
    const clientId = req.params.id
    const result = await UserService.getUserById(clientId);
    data = result;
  } catch (error: any) {
    if (code === 200) code = 500;
    message = error.message;
  } finally {
    return res.status(code).json(HTTPUtils.generateHTTPResponse(code, data, message));
  }
}

const getUsers = async (req: Request, res: Response) => {
  let code = 200;
  let data = null;
  let message = null;

  try {
    const { limit = "10", skip = "0" } = req.query as { limit: string, skip: string }
    const result = await UserService.getUsers(limit, skip);
    data = result;
  } catch (error: any) {
    if (code === 200) code = 500;
    message = error.message;
  } finally {
    return res.status(code).json(HTTPUtils.generateHTTPResponse(code, data, message));
  }
}

const addUser = async (req: Request, res: Response) => {
  let code = 200;
  let data = null;
  let message = null;

  try {
    const result = await UserService.addUser(req.body);
    data = result;
  } catch (error: any) {
    if (code === 200) code = 500;
    message = error.message;
  } finally {
    return res.status(code).json(HTTPUtils.generateHTTPResponse(code, data, message));
  }
}

const updateUserById = async (req: Request, res: Response) => {
  let code = 200;
  let data = null;
  let message = null;

  try {
    const clientId = req.params.id
    const result = await UserService.updateUserById(clientId, req.body);
    data = result;
  } catch (error: any) {
    if (code === 200) code = 500;
    message = error.message;
  } finally {
    return res.status(code).json(HTTPUtils.generateHTTPResponse(code, data, message));
  }
}

export const UserController = {
  getUserById,
  getUsers,
  addUser,
  updateUserById
}