import { API } from "src/classes/API";

// Import types
import type { IAPIMethods } from "src/types/api";

// Import assets
import __Data__ from "src/assets/users_data.json";

export class Identity_ChainCodeAPI extends API implements IAPIMethods {
  constructor(base: string) {
    super(base);
  }

  async getAsync(): Promise<any> {
    try {
      const token = this.getToken();

      if(!token) return;

      const url = this.base + "/identity/verify";
      const response = await fetch(url, {
        method: "get",
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

  async postAsync(...args: [string, string]): Promise<any> {
    try {
      if(!args[0] || !args[1])
        throw new Error("username and password are required");
  
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