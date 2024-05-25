import fs from "fs";
import path from "path";

import { BlockChainNetwork } from "../network/blockchainNet"
import { UserOfNetwork } from "../network/userOfNet"

// Import services
import { UserService } from "../services/user.service"
import { ClientService } from "../services/client.service";

// Import utils
import { HTTPUtils } from "../assets/utilities/http"

// Import Network's Congfigurations
import { NetworkConfig } from "../assets/config/network"

// Import types
import type { Request, Response } from 'express'
import type { CA_UserAttribute } from '../types/net.types'

const register = async (req: Request, res: Response) => {
  let code = 200;
  let data = null;
  let message = null;

  try {
    const { username, password, firstName, lastName, birthDate } = req.body;
    // This is permissions
    let attrs: Array<CA_UserAttribute> = NetworkConfig.Roles.UserDefault.attrs;
    let registrarId = (req as any).walletId;
    let registerId = username + "@" + registrarId.split("@")[1];
    console.log("Registrar: ", registrarId);
    console.log("Register: ", registerId);
    await UserOfNetwork.registerUser(registrarId, registerId, password, attrs);

    attrs = attrs.map(attr => {
      delete attr.value;
      attr.optional = false;
      return attr;
    });

    await UserOfNetwork.enrollUser(registerId, registerId, password, attrs);
    await UserService.addUser({
      role: "user",
      username,
      password,
      firstName,
      lastName,
      walletId: registerId,
      birthDate
    });

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
    const enrollmentResults = await Promise.all(
      NetworkConfig.CAAccountOrgs.map(org => UserOfNetwork.enrollUser(
        org.Admin.Id,
        org.Admin.enrollmentId,
        org.Admin.enrollmentSecret
      ))
    );

    if(enrollmentResults.some(r => !r)) throw new Error("Cannot enroll admin, there are an error");

    await Promise.all(
      NetworkConfig.CAAccountOrgs.map((org, index) => UserService.addUser(
        {
          walletId: org.Admin.Id,
          role: "admin",
          username: org.Admin.username,
          password: org.Admin.password,
          firstName: "Admin" + index,
          lastName: "Super",
          birthDate: "01/01/1970"
        }
      ))
    );

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
    const callerId = (req as any).walletId;
    const response = await BlockChainNetwork.invoke(
      callerId,
      NetworkConfig.SmartContractNames.RealEstate.GetRealEstate,
      id
    );
    const clientIdArr: Array<string> = response.ownerIds;
    const owners = await ClientService.getClientsWithIds(clientIdArr);

    response.owners = owners!.filter(client => response.ownerIds.includes(client._id.toString()));
    delete response.ownerIds;

    console.log("Result: ", response);

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
    const { limit = 10, skip = 0 } = req.query;
    const callerId = (req as any).walletId;
    const response = await BlockChainNetwork.invoke(
      callerId,
      NetworkConfig.SmartContractNames.RealEstate.ListRealEstates,
      limit, skip
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
    const data = req.body;
    const callerId = (req as any).walletId;
    const response = await BlockChainNetwork.invoke(
      callerId,
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

const initializeRealEstates = async (req: Request, res: Response) => {
  let code = 200;
  let data = null;
  let message = null;

  try {
    const response = await BlockChainNetwork.invoke(
      NetworkConfig.CAAccountOrgs[0].Admin.Id,
      NetworkConfig.SmartContractNames.RealEstate.Init,
      ""
    );
    message = "Initialize real estates done";
  } catch (error: any) {
    if(code === 200) code = 500;
    message = error.message;
  } finally {
    return res.status(code).json(HTTPUtils.generateHTTPResponse(code, data, message));
  }
}

const clearAll = async (req: Request, res: Response) => {
  let code = 200;
  let data = null;
  let message = null;

  try {
    // Clear all identities in wallet
    let directory = NetworkConfig.Paths.Wallet;

    fs.readdir(directory, (err, files) => {
      if (err) throw err;
      for (const file of files) {
        fs.unlink(path.join(directory, file), (err) => {
          if (err) throw err;
        });
      }
    });

    // Clear all users in database
    await UserService.deleteUsers();

    message = "Clear all data done";
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
  getRealEstate,
  initializeRealEstates,
  clearAll
}