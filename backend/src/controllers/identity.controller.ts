
import { HTTPUtils } from "../assets/utilities/http"

import type { Request, Response } from 'express'
import { IdentityService } from "../services/identity.service";

const authenticate = async (req: Request, res: Response) => {
  let code = 200;
  let data = null;
  let message = null;

  try {
    const result = await IdentityService.authenticate(req.body);

    if(!result) {
      code = 404;
      throw new Error("The user with username [...] doesn't exist");
    }

    data = result;
  } catch (error: any) {
    if (code === 200) code = 500;
    message = error.message;
  } finally {
    return res.status(code).json(HTTPUtils.generateHTTPResponse(code, data, message));
  }
}

const verify = async (req: Request, res: Response) => {
  let code = 200;
  let data = null;
  let message = null;

  try {
    const requestedToken = req.headers.authorization;
    if(requestedToken === undefined || requestedToken === null || requestedToken === "")
      throw new Error("Token is required");
    
    const result = await IdentityService.verifyToken(requestedToken);

    if(!result)
      throw new Error("Invalid token");

    data = result;
  } catch (error: any) {
    if (code === 200) code = 500;
    message = error.message;
  } finally {
    return res.status(code).json(HTTPUtils.generateHTTPResponse(code, data, message));
  }
}


export const IdentityController = {
  authenticate,
  verify
}