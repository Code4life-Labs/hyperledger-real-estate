
import { HTTPUtils } from "../assets/utilities/http"
import { ClientService } from "../services/client.service";

// Import types
import type { Request, Response } from 'express'

const getClientById = async (req: Request, res: Response) => {
  let code = 200;
  let data = null;
  let message = null;

  try {
    const clientId = req.params.id
    const result = await ClientService.getClientById(clientId);
    data = result;
  } catch (error: any) {
    if (code === 200) code = 500;
    message = error.message;
  } finally {
    return res.status(code).json(HTTPUtils.generateHTTPResponse(code, data, message));
  }
}

const getClients = async (req: Request, res: Response) => {
  let code = 200;
  let data = null;
  let message = null;

  try {
    const { limit = "10", skip = "0", name } = req.query as { limit: string, skip: string, name: string }
    let result;

    if(name)
      result = await ClientService.getClientsByName(name) as Array<any>;
    else
      result = await ClientService.getClients(limit, skip) as Array<any>;

    data = result;
  } catch (error: any) {
    if (code === 200) code = 500;
    message = error.message;
  } finally {
    return res.status(code).json(HTTPUtils.generateHTTPResponse(code, data, message));
  }
}

const getClientsByName = async (req: Request, res: Response) => {
  let code = 200;
  let data = null;
  let message = null;

  try {
    const { name = "" } = req.query as { name: string }
    const result = await ClientService.getClientsByName(name);
    data = result;
  } catch (error: any) {
    if (code === 200) code = 500;
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
    data = result;
  } catch (error: any) {
    if (code === 200) code = 500;
    message = error.message;
  } finally {
    return res.status(code).json(HTTPUtils.generateHTTPResponse(code, data, message));
  }
}

const updateClientById = async (req: Request, res: Response) => {
  let code = 200;
  let data = null;
  let message = null;

  try {
    const clientId = req.params.id
    const result = await ClientService.updateClientById(clientId, req.body);
    data = result;
  } catch (error: any) {
    if (code === 200) code = 500;
    message = error.message;
  } finally {
    return res.status(code).json(HTTPUtils.generateHTTPResponse(code, data, message));
  }
}

export const ClientController = {
  getClientById,
  getClients,
  getClientsByName,
  addClient,
  updateClientById
}