// Import types
import type { Person } from 'src/objects/Person';

export type Chaincode_RealEstate = {
  id: string;
  length: number;
  width: number;
}

export type Chaincode_Client = Person;

export type Chaincode_Admin = { role: string } & Person;