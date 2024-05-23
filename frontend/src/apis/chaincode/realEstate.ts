import { API } from "src/classes/API";

// Import utils
import { OtherUtils } from "src/utils/other";

// Import types
import type { IAPIMethods } from "src/types/api";
import type {
  Chaincode_RealEstate_ResponsedData,
  Chaincode_RealEstate_AppData
} from "./types";

// Import assets
import __Data__ from "src/assets/real_estates_data.json";
import __Client_Data__ from "src/assets/clients_data.json";

export class RealEstate_ChainCodeAPI extends API implements IAPIMethods {
  constructor(base: string) {
    super(base);
  }

  async getAsync(id: string): Promise<any> {
    const token = this.getToken();

    if(!token) return;

    const url = this.base + `/net/real-estate/${id}`;
    const response = await fetch(url, {
      headers: this.getAuthorization(token)
    });

    return response.json();
  }

  async getMultipleAsync(...args: [number, number]): Promise<any> {
    const token = this.getToken();

    if(!token) return;

    const limit = args[0] || 5;
    const skip = args[1] || 0;
    const url = this.base + `/net/real-estates?limit=${limit}&skip=${skip}`;
    const response = await fetch(url, {
      headers: this.getAuthorization(token)
    });

    return response.json();
  }

  async postAsync(data: Chaincode_RealEstate_ResponsedData): Promise<any> {
    const token = this.getToken();

    if(!token) return;

    const url = this.base + `/net/real-estate`;
    const response = await fetch(url, {
      method: "post",
      headers: this.getAuthorization(token),
      body: JSON.stringify(data)
    });

    return response.json();
  }

  async patchAsync(data: Partial<Chaincode_RealEstate_ResponsedData>): Promise<any> {
    const token = this.getToken();

    if(!token) return;

    const url = this.base + `/net/real-estate`;
    const response = await fetch(url, {
      method: "patch",
      headers: this.getAuthorization(token),
      body: JSON.stringify(data)
    });

    return response.json();
  }
}