// Import types
import type { Person } from 'src/objects/Person';

export type Chaincode_RealEstate_Part = {
  area: number;
  useFor: string;
}

type Chaincode_RealEstate = {
  _id: string;
  area: number;
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


export interface Chaincode_Client extends Person {
  _id: string;
};

export interface Chaincode_User extends Person {
  _id: string;
  role: string;
};