import { API } from "src/classes/API";

// Import utils
import { OtherUtils } from "src/utils/other";

// Import types
import type { IAPIMethods } from "src/types/api";
import type { Chaincode_User } from "./types";

// Import assets
import __Data__ from "src/assets/users_data.json";

export class User_ChainCodeAPI extends API implements IAPIMethods {
  constructor(base: string) {
    super(base);
  }

  async getAsync(id: string): Promise<any> {
    const token = this.getToken();

    if(!token) return;

    const url = this.base + `/users/${id}`;
    const response = await fetch(url, {
      headers: this.getAuthorization(token)
    });

    return response.json();
  }

  async getMultipleAsync(): Promise<any> {
    return __Data__.data;
  }
}