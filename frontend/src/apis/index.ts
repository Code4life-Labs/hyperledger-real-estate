import { RealEstate_ChainCodeAPI } from "./chaincode/realEstate";

const base = import.meta.env.API_ROOT;

export const ChainCodeAPI = {
  ReadEstates: new RealEstate_ChainCodeAPI(base)
}