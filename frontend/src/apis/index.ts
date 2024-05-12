// ChainCodeAPI
import { RealEstate_ChainCodeAPI } from "./chaincode/realEstate";
import { Client_ChainCodeAPI } from "./chaincode/client";
import { Admin_ChainCodeAPI } from "./chaincode/admin";

// Import utils
import { ObjectUtils } from "src/utils/object";

const base = import.meta.env.API_ROOT;

const ChainCodeAPI = {
  ReadEstate: new RealEstate_ChainCodeAPI(base),
  Client: new Client_ChainCodeAPI(base),
  Admin: new Admin_ChainCodeAPI(base)
}

// Lock all objects here
ObjectUtils.lock(ChainCodeAPI);

export {
  ChainCodeAPI
};