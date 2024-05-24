import { API } from "src/classes/API";

// Import utils
import { OtherUtils } from "src/utils/other";

// Import types
import type { IAPIMethods } from "src/types/api";
import type { Chaincode_Client } from "./types";

// Import assets
import __Data__ from "src/assets/clients_data.json";

export class Client_ChainCodeAPI extends API implements IAPIMethods {
  constructor(base: string) {
    super(base);
  }

  async getAsync(id: string): Promise<any> {
    try {
      const token = this.getToken();

      if(!token) return;

      const url = this.base + `/clients/${id}`;
      const response = await fetch(url, {
        headers: this.getAuthorization(token)
      });
      const result = await response.json();

      if(result.error)
        throw new Error(result.error.message);

      return result.data;
    } catch (error: any) {
      console.error(error.message);
      return;
    } 
  }

  async getMultipleAsync(...args: [number, number]): Promise<any> {
    try {
      const token = this.getToken();

      if(!token) return;

      const limit = args[0] || 5;
      const skip = args[1] || 0;
      const url = this.base + `/clients/?limit=${limit}&skip=${skip}`;
      const response = await fetch(url, {
        headers: this.getAuthorization(token)
      });
      const result = await response.json(); 

      if(result.error)
        throw new Error(result.error.message);

      return result.data;
    } catch (error: any) {
      console.error(error.message);
      return;
    }
  }

  async postAsync(data: Chaincode_Client): Promise<any> {
    try {
      const token = this.getToken();

      if(!token) return;

      const url = this.base + `/client`;
      const response = await fetch(url, {
        method: "post",
        headers: this.getAuthorization(token),
        body: JSON.stringify(data)
      });
      const result = await response.json();

      if(result.error)
        throw new Error(result.error.message);

      return result.data;
    } catch (error: any) {
      console.log(error.message);
      return;
    }
  }

  async patchAsync(data: Partial<Chaincode_Client>): Promise<any> {
    try {
      const token = this.getToken();

      if(!token) return;

      const url = this.base + `/client/${data.id}`;
      const response = await fetch(url, {
        method: "patch",
        headers: this.getAuthorization(token),
        body: JSON.stringify(data)
      });
      const result = await response.json();

      if(result.error)
        throw new Error(result.error.message);

      return result.data;
    } catch (error: any) {
      console.error(error.message);
      return;
    }
  }
}