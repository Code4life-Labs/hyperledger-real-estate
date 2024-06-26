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

  async getMultipleAsync(...args: [number, number, string]): Promise<any> {
    try {
      const token = this.getToken();

      if(!token) return;

      const limit = args[0] || 5;
      const skip = args[1] || 0;
      let url = this.base + `/clients/?limit=${limit}&skip=${skip}`;

      if(args[2]) url += `&name=${args[2]}`;

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

      delete (data as any).id;

      const response = await fetch(url, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          ...this.getAuthorization(token)
        },
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

      const url = this.base + `/clients/${data._id}`;

      delete data._id;
      delete data.id;

      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          ...this.getAuthorization(token)
        },
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