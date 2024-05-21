import { IReqAddEditClient, IReqIdentifyClient } from "../assets/interfaces/client.interface";
import { ClientModel } from "../models/client.model";

const getClient = async (clientId: string) => {
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

const editClient = async (clientId: string, data: IReqAddEditClient) => {
  try {
    await ClientModel.update(clientId, data);
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

export const ClientService = {
  getClient,
  addClient,
  editClient
}
