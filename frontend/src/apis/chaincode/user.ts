import { API } from "src/classes/API";

// Import utils
import { OtherUtils } from "src/utils/other";

// Import types
import type { IAPIMethods } from "src/types/api";
import type { Chaincode_User } from "./types";

// Import assets
import __Data__ from "src/assets/users_chaincode.json";

export class User_ChainCodeAPI extends API implements IAPIMethods {
  constructor(base: string) {
    super(base);
  }

  async getAsync(username: string, password: string): Promise<Chaincode_User> {
    await OtherUtils.wait(1000);
    const user = __Data__.data.find(admin => admin.username === username && admin.hashedPassword === password) as Chaincode_User;
    return user;
  }
}