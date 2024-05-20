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
import __Client_Data__ from "src/assets/clients_data.json"

export class RealEstate_ChainCodeAPI extends API implements IAPIMethods {
  constructor(base: string) {
    super(base);
  }

  async getAsync(id: string): Promise<Chaincode_RealEstate_AppData> {
    await OtherUtils.wait(1000);
    const data = __Data__.data.find(realEstate => realEstate.id === id) as any;
    const clients = __Client_Data__.data.filter(client => data?.ownerIds.includes(client.id));
    return { ...data, owners: clients } as Chaincode_RealEstate_AppData;
  }

  async getMultipleAsync(): Promise<Array<Chaincode_RealEstate_ResponsedData>> {
    await OtherUtils.wait(1000);
    return __Data__.data as Array<Chaincode_RealEstate_ResponsedData>;
  }
}