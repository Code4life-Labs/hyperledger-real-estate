
import { HTTPUtils } from "../assets/utilities/http"

import type { Request, Response } from 'express'
import { ClientService } from "../services/client.service";

const getClient = async (req: Request, res: Response) => {
  let code = 200;
  let data = null;
  let message = null;

  try {
    const clientId = req.params.id
    const result = await ClientService.getClient(clientId);
    data = { success: result };
  } catch (error: any) {
    if (code === 200) code = 500;
    data = { error: error.message };
    message = error.message;
  } finally {
    return res.status(code).json(HTTPUtils.generateHTTPResponse(code, data, message));
  }
}

const addClient = async (req: Request, res: Response) => {
  let code = 200;
  let data = null;
  let message = null;

  try {
    const result = await ClientService.addClient(req.body);
    data = { success: result };
  } catch (error: any) {
    if (code === 200) code = 500;
    data = { error: error.message };
    message = error.message;
  } finally {
    return res.status(code).json(HTTPUtils.generateHTTPResponse(code, data, message));
  }
}

const editClient = async (req: Request, res: Response) => {
  let code = 200;
  let data = null;
  let message = null;

  try {
    const clientId = req.params.id
    const result = await ClientService.editClient(clientId, req.body);
    data = { success: result };
  } catch (error: any) {
    if (code === 200) code = 500;
    data = { error: error.message };
    message = error.message;
  } finally {
    return res.status(code).json(HTTPUtils.generateHTTPResponse(code, data, message));
  }
}

export const ClientController = {
  getClient,
  addClient,
  editClient
}