// ChainCodeAPI
import { RealEstate_ChainCodeAPI } from "./chaincode/realEstate";
import { Client_ChainCodeAPI } from "./chaincode/client";
import { User_ChainCodeAPI } from "./chaincode/user";
import { Identity_ChainCodeAPI } from "./chaincode/identity";

// Import utils
import { ObjectUtils } from "src/utils/object";

const __ChainCodeAPI_Base = import.meta.env.VITE_API_ROOT + "/v1";

const ChainCodeAPI = {
  RealEstate: new RealEstate_ChainCodeAPI(__ChainCodeAPI_Base),
  Client: new Client_ChainCodeAPI(__ChainCodeAPI_Base),
  User: new User_ChainCodeAPI(__ChainCodeAPI_Base),
  Identity: new Identity_ChainCodeAPI(__ChainCodeAPI_Base)
}

// Lock all objects here
ObjectUtils.lock(ChainCodeAPI);

export {
  ChainCodeAPI
};