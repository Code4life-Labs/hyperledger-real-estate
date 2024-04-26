import { BlockChainNetwork } from "../network/blockchainNet";
import { UserOfNetwork } from "../network/userOfNet";

import { HttpStatusCode } from '../assets/utilities/constants'

// Import types
import type { Request, Response } from 'express'

const listAccounts = async (req: Request, res: Response) => {
  let code = 200;
  let data;

  try {
    const { username } = req.body;
    const response = await BlockChainNetwork.invoke(username, "listAccounts");
    data = response;
  } catch (error: any) {
    data = { error: error.message };
  } finally {
    return res.status(code).json(data);
  }
}

const createAccount = async (req: Request, res: Response) => {
  let code = 200;
  let data;

  try {
    const { username, balance } = req.body;
    const response = await BlockChainNetwork.invoke(username, "initAccount", username, balance);
    data = response;
  } catch (error: any) {
    data = { error: error.message };
  } finally {
    return res.status(code).json(data);
  }
}

const register = async (req: Request, res: Response) => {
  let code = 200;
  let data;

  try {
    const { username, password, attrs } = req.body;
    const registerResult = await UserOfNetwork.registerUser("CAAdmin@org1.example.com", username, password, attrs);
    const enrollmentResult = await UserOfNetwork.enrollUser(username, username, password, attrs);
    console.log("Resgister Result (secret): ", registerResult);
    data = { success: "Your account is registered successfully" };
  } catch (error: any) {
    data = { error: error.message };
  } finally {
    return res.status(code).json(data);
  }
}

const enrollAdmin = async (req: Request, res: Response) => {
  let code = 200;
  let data;

  try {
    const enrollmentResult = await UserOfNetwork.enrollUser("CAAdmin@org1.example.com", "admin", "adminpw");

    data = { success: "Admin is enrolled successfully" };
  } catch (error: any) {
    data = { error: error.message };
  } finally {
    return res.status(code).json(data);
  }
}

export const TestController = {
  listAccounts,
  register,
  enrollAdmin,
  createAccount
}