// Import types
import type { Person } from 'src/objects/Person';

type Chaincode_RealEstate_Part = {
  length: number;
  width: number;
  useFor: string;
}

type Chaincode_RealEstate = {
  id: string;
  length: number;
  width: number;
  parts: Array<Chaincode_RealEstate_Part>;
  imgs: Array<string>;
  no: number;
  localNo: number;
}

export type Chaincode_RealEstate_ResponsedData = {
  ownerIds: Array<string>;
} & Chaincode_RealEstate;

export type Chaincode_RealEstate_AppData = {
  owners: Array<Chaincode_Client>;
} & Chaincode_RealEstate;


export interface Chaincode_Client extends Person {};

export interface Chaincode_Admin extends Person {
  role: string;
};