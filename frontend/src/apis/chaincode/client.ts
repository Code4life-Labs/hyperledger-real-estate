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
    const token = this.getToken();

    if(!token) return;

    const url = this.base + `/clients/${id}`;
    const response = await fetch(url, {
      headers: this.getAuthorization(token)
    });

    return response.json();
  }

  async getMultipleAsync(...args: [string, string]): Promise<any> {
    const token = this.getToken();

    if(!token) return;

    const limit = args[0] || 5;
    const skip = args[1] || 0;
    const url = this.base + `/clients/?limit=${limit}&skip=${skip}`;
    const response = await fetch(url, {
      headers: this.getAuthorization(token)
    });

    return response.json();
  }

  async postAsync(data: Chaincode_Client): Promise<any> {
    const token = this.getToken();

    if(!token) return;

    const url = this.base + `/client`;
    const response = await fetch(url, {
      method: "post",
      headers: this.getAuthorization(token),
      body: JSON.stringify(data)
    });

    return response.json();
  }

  async patchAsync(data: Partial<Chaincode_Client>): Promise<any> {
    const token = this.getToken();

    if(!token) return;

    const url = this.base + `/client/${data.id}`;
    const response = await fetch(url, {
      method: "patch",
      headers: this.getAuthorization(token),
      body: JSON.stringify(data)
    });

    return response.json();
  }
}