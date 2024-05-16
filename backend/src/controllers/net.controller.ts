import { BlockChainNetwork } from "../network/blockchainNet"
import { UserOfNetwork } from "../network/userOfNet"

// Import utils
import { HTTPUtils } from "../assets/utilities/http"

// Import Network's Congfigurations
import { NetworkConfig } from "../assets/config/network"

// Import types
import type { Request, Response } from 'express'
import type { CA_UserAttribute } from '../types/net.types.ts'

const permissions = {
  init: "init",
  createRealEstate: "create_real_estate",
  listRealEstates: "list_real_estates"
};

const register = async (req: Request, res: Response) => {
  let code = 200;
  let data = null;
  let message = null;

  try {
    const { username, password } = req.body;
    // This is permissions
    let attrs: Array<CA_UserAttribute> = [
      { name: permissions.createRealEstate, value: "true" },
      { name: permissions.listRealEstates, value: "true" }
    ];

    await UserOfNetwork.registerUser(NetworkConfig.CAAccountOrgs[0].Admin.Id, username, password, attrs);

    attrs = attrs.map(attr => {
      delete attr.value;
      attr.optional = false;
      return attr;
    });
    await UserOfNetwork.enrollUser(username, username, password, attrs);

    message = "Your account is registered successfully";
  } catch (error: any) {
    if(code === 200) code = 500;
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

    message = "Admin is enrolled successfully";
  } catch (error: any) {
    if(code === 200) code = 500;
    message = error.message;
  } finally {
    return res.status(code).json(HTTPUtils.generateHTTPResponse(code, data, message));
  }
}

const getUser = async (req: Request, res: Response) => {
  let code = 200;
  let data = null;
  let message = null;

  try {
    const { username } = req.params;
    const user = await UserOfNetwork.getUser(username);

    if(!user) throw new Error(`Cannot get user with this ${username} username`);
    console.log("User: ", user);
    data = user;
  } catch (error: any) {
    if(code === 200) code = 500;
    data = null;
    message = error.message;
  } finally {
    return res.status(code).json(HTTPUtils.generateHTTPResponse(code, data, message));
  }
}

const getRealEstate = async (req: Request, res: Response) => {
  let code = 200;
  let data = null;
  let message = null;

  try {
    if(!req.params.id)
      throw new Error("Id of real estate is required");

    const { id } = req.params;
    const { username } = req.body;
    const response = await BlockChainNetwork.invoke(
      username,
      NetworkConfig.SmartContractNames.RealEstate.GetRealEstate,
      id
    );
    data = response;
    message = "Get real estate done";
  } catch (error: any) {
    if(code === 200) code = 500;
    message = error.message;
  } finally {
    return res.status(code).json(HTTPUtils.generateHTTPResponse(code, data, message));
  }
}

const listRealEstates = async (req: Request, res: Response) => {
  let code = 200;
  let data = null;
  let message = null;

  try {
    const { username } = req.body;
    const response = await BlockChainNetwork.invoke(
      username,
      NetworkConfig.SmartContractNames.RealEstate.ListRealEstates
    );
    data = response;
    message = "Get real estates done";
  } catch (error: any) {
    if(code === 200) code = 500;
    message = error.message;
  } finally {
    return res.status(code).json(HTTPUtils.generateHTTPResponse(code, data, message));
  }
}

const createRealEstate = async (req: Request, res: Response) => {
  let code = 200;
  let data = null;
  let message = null;

  try {
    const { username, data } = req.body;
    const response = await BlockChainNetwork.invoke(
      username,
      NetworkConfig.SmartContractNames.RealEstate.CreateRealEstate,
      JSON.stringify(data)
    );
    message = "Create real estate done";
  } catch (error: any) {
    if(code === 200) code = 500;
    message = error.message;
  } finally {
    return res.status(code).json(HTTPUtils.generateHTTPResponse(code, data, message));
  }
}

const patchRealEstate = async (req: Request, res: Response) => {
  let code = 200;
  let data = null;
  let message = null;

  try {
    const { username, data } = req.body;
    const response = await BlockChainNetwork.invoke(
      username,
      NetworkConfig.SmartContractNames.RealEstate.PatchRealEstate,
      JSON.stringify(data)
    );
    message = "Patch real estate done";
  } catch (error: any) {
    if(code === 200) code = 500;
    message = error.message;
  } finally {
    return res.status(code).json(HTTPUtils.generateHTTPResponse(code, data, message));
  }
}

export const NetController = {
  register,
  enrollAdmin,
  getUser,
  listRealEstates,
  createRealEstate,
  patchRealEstate,
  getRealEstate
}