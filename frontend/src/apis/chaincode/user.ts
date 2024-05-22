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

  async getAsync(...args: [string, string | undefined]): Promise<Chaincode_User> {
    await OtherUtils.wait(1000);
    if(Boolean(args[0]) && Boolean(args[1]))
      return __Data__.data.find(admin => admin.username === args[0] && admin.hashedPassword === args[1]) as Chaincode_User;
    return __Data__.data.find(admin => admin.id === args[0]) as Chaincode_User;
  }

  async getMultipleAsync(): Promise<Array<Chaincode_User>> {
    return __Data__.data as Array<Chaincode_User>;
  }
}