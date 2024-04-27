import { BlockChainNetwork } from "../network/blockchainNet"
import { UserOfNetwork } from "../network/userOfNet"

// Import utils
import { HTTPUtils } from "../assets/utilities/http"

// Import Network's Congfigurations
import { NetworkConfig } from "../assets/config/network"

// Import types
import type { Request, Response } from 'express'

const listAccounts = async (req: Request, res: Response) => {
  let code = 200;
  let data = null;
  let message = null;

  try {
    const { username } = req.body;
    const response = await BlockChainNetwork.invoke(username, NetworkConfig.SmartContractNames.Account.ListAccount);
    data = { success: response };
  } catch (error: any) {
    if(code === 200) code = 500;
    data = { error: error.message };
    message = error.message;
  } finally {
    return res.status(code).json(HTTPUtils.generateHTTPResponse(code, data, message));
  }
}

const createAccount = async (req: Request, res: Response) => {
  let code = 200;
  let data = null;
  let message = null;

  try {
    const { username, balance } = req.body;
    const response = await BlockChainNetwork.invoke(username, NetworkConfig.SmartContractNames.Account.InitAccount, username, balance);
    data = { success: response };
  } catch (error: any) {
    if(code === 200) code = 500;
    data = { error: error.message };
    message = error.message;
  } finally {
    return res.status(code).json(HTTPUtils.generateHTTPResponse(code, data, message));
  }
}

const register = async (req: Request, res: Response) => {
  let code = 200;
  let data = null;
  let message = null;

  try {
    const { username, password, attrs } = req.body;
    const registerResult = await UserOfNetwork.registerUser(NetworkConfig.CAAccountOrgs[0].Admin.Id, username, password, attrs);
    const enrollmentResult = await UserOfNetwork.enrollUser(username, username, password, attrs);
    
    if(!enrollmentResult) throw new Error("Your registration process failed");

    data = { success: "Your account is registered successfully" };
  } catch (error: any) {
    if(code === 200) code = 500;
    data = { error: error.message };
    message = error.message;
  } finally {
    return res.status(code).json(HTTPUtils.generateHTTPResponse(code, data, message));
  }
}

const enrollAdmin = async (req: Request, res: Response) => {
  let code = 200;
  let data = null;
  let message = null;

  try {
    const { org } = req.body;
    const enrollmentResult = await UserOfNetwork
    .enrollUser(
      NetworkConfig.CAAccountOrgs[org || 0].Admin.Id,
      NetworkConfig.CAAccountOrgs[org || 0].Admin.enrollmentId,
      NetworkConfig.CAAccountOrgs[org || 0].Admin.enrollmentSecret
    );

    if(!enrollmentResult) throw new Error("Cannot enroll admin, there are an error");

    data = { success: "Admin is enrolled successfully" };
  } catch (error: any) {
    if(code === 200) code = 500;
    data = { error: error.message };
    message = error.message;
  } finally {
    return res.status(code).json(HTTPUtils.generateHTTPResponse(code, data, message));
  }
}

export const TestController = {
  listAccounts,
  register,
  enrollAdmin,
  createAccount
}