import { API } from "src/classes/API";

// Import utils
import { OtherUtils } from "src/utils/other";
import { BrowserStorageUtils } from "src/utils/browser_storage";

// Import types
import type { IAPIMethods } from "src/types/api";
import type { Chaincode_User } from "./types";

// Import assets
import __Data__ from "src/assets/users_data.json";

export class Identity_ChainCodeAPI extends API implements IAPIMethods {
  constructor(base: string) {
    super(base);
  }

  async getAsync(): Promise<any> {
    const token = this.getToken();

    if(!token) return;

    const url = this.base + "/identity/verify";
    const response = await fetch(url, {
      method: "get",
      headers: this.getAuthorization(token)
    });

    return response.json();
  }

  async postAsync(...args: [string, string]): Promise<any> {
    if(!args[0] || !args[1]) {
      console.log("username and password are required");
      return;
    }

    const url = this.base + "/identity/auth";
    const response = await fetch(url, {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: args[0],
        password: args[1]
      })
    });

    return response.json();
  }
}