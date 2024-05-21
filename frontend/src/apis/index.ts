// ChainCodeAPI
import { RealEstate_ChainCodeAPI } from "./chaincode/realEstate";
import { Client_ChainCodeAPI } from "./chaincode/client";
import { User_ChainCodeAPI } from "./chaincode/user";

// Import utils
import { ObjectUtils } from "src/utils/object";

const base = import.meta.env.API_ROOT;

const ChainCodeAPI = {
  RealEstate: new RealEstate_ChainCodeAPI(base),
  Client: new Client_ChainCodeAPI(base),
  User: new User_ChainCodeAPI(base)
}

// Lock all objects here
ObjectUtils.lock(ChainCodeAPI);

export {
  ChainCodeAPI
};