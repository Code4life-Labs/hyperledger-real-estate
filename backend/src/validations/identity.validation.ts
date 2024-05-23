import { identitySchema } from '../schemas/identity.schema'

// Import utils
import { HTTPUtils } from "../assets/utilities/http"

// Import types
import type { NextFunction, Request, Response } from 'express'

const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  const condition = identitySchema.authenticateSchema;
  let code = 200;
  let data = null;
  let message = null;

  try {
    console.log("Req Body: ", req.body);
    await condition.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error: any) {
    if (code === 200) code = 500;
    message = error.message;
    return res.status(code).json(HTTPUtils.generateHTTPResponse(code, data, message));
  }
}

export const IdentityValidation = {
  authenticate,
}
