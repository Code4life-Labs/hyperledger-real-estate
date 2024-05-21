
import { HTTPUtils } from "../assets/utilities/http"

import type { Request, Response } from 'express'
import { IdentityService } from "../services/identity.service";

const authenticate = async (req: Request, res: Response) => {
  let code = 200;
  let data = null;
  let message = null;

  try {
    const result = await IdentityService.authenticate(req.body);
    data = { success: result };
  } catch (error: any) {
    if (code === 200) code = 500;
    data = { error: error.message };
    message = error.message;
  } finally {
    return res.status(code).json(HTTPUtils.generateHTTPResponse(code, data, message));
  }
}


export const IdentityController = {
  authenticate
}