import { API } from "src/classes/API";

// Import utils
import { OtherUtils } from "src/utils/other";

// Import types
import type { IAPIMethods } from "src/types/api";
import type { Chaincode_RealEstate } from "./types";

// Import assets
import __Data__ from "src/assets/real_estates_chaincode.json";

export class RealEstate_ChainCodeAPI extends API implements IAPIMethods {
  constructor(base: string) {
    super(base);
  }

  async getAsync(id: string): Promise<Chaincode_RealEstate> {
    await OtherUtils.wait(1000);
    return __Data__.data.find(realEstate => realEstate.id === id) as Chaincode_RealEstate;
  }

  async getMultipleAsync(): Promise<Array<Chaincode_RealEstate>> {
    await OtherUtils.wait(1000);
    return __Data__.data as Array<Chaincode_RealEstate>;
  }
}