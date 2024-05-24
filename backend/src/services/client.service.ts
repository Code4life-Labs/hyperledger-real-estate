import { IReqAddEditClient, IReqIdentifyClient } from "../assets/interfaces/client.interface";
import { ClientModel } from "../models/client.model";

const getClientById = async (clientId: string) => {
  try {
    const result = await ClientModel.findOneById(clientId);
    if (!result) throw new Error("Can't find this user!")
    return result;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
}

const getClientsWithIds = async (ids: Array<string>) => {
  try {
    const results = await ClientModel.findManyByIds(ids)

    return results
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
  }
}

const updateClientById = async (clientId: string, data: IReqAddEditClient) => {
  try {
    await ClientModel.updateOneById(clientId, data);
    return "Update success client!";
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
}

const addClient = async (data: IReqAddEditClient) => {
  try {
    await ClientModel.createNew(data);
    return "Create success client!";
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
}

const getClients = async (limit: string, skip: string) => {
  try {
    const results = await ClientModel.getPaginationClients(limit, skip)

    return results

  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
  }
}

export const ClientService = {
  getClientById,
  addClient,
  updateClientById,
  getClients,
  getClientsWithIds
}
