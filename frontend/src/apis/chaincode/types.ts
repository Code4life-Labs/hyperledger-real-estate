// Import types
import type { Person } from 'src/objects/Person';

export type Chaincode_RealEstate = {
  id: string;
  length: number;
  width: number;
}

export interface Chaincode_Client extends Person {};

export interface Chaincode_Admin extends Person {
  role: string;
};