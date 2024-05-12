import { API } from "src/classes/API";

// Import utils
import { OtherUtils } from "src/utils/other";

// Import types
import type { IAPIMethods } from "src/types/api";
import type { Chaincode_Admin } from "./types";

// Import assets
import __Data__ from "src/assets/admins_chaincode.json";

export class Admin_ChainCodeAPI extends API implements IAPIMethods {
  constructor(base: string) {
    super(base);
  }

  async getAsync(id: string): Promise<Chaincode_Admin> {
    await OtherUtils.wait(1000);
    return __Data__.data.find(admin => admin.id === id) as Chaincode_Admin;
  }

  async getMultipleAsync(): Promise<Array<Chaincode_Admin>> {
    await OtherUtils.wait(1000);
    return __Data__.data as Array<Chaincode_Admin>;
  }
}