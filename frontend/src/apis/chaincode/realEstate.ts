import { API } from "src/classes/API";

// Import utils
import { OtherUtils } from "src/utils/other";

// Import types
import type { IAPIMethods } from "src/types/api";

// Import assets
import RealEstatesData from "src/assets/realestates.json";

export type RealEstateData = {
  id: string;
  length: number;
  width: number;
}

export class RealEstate_ChainCodeAPI extends API implements IAPIMethods {
  constructor(base: string) {
    super(base);
  }

  async getMultipleAsync(): Promise<Array<RealEstateData>> {
    await OtherUtils.wait(1000);
    return RealEstatesData.data as Array<RealEstateData>;
  }
}