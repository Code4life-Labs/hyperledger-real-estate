import { API } from "src/classes/API";

// Import utils
import { OtherUtils } from "src/utils/other";

// Import types
import type { IAPIMethods } from "src/types/api";
import type { Chaincode_Client } from "./types";

// Import assets
import __Data__ from "src/assets/clients_data.json";

export class Client_ChainCodeAPI extends API implements IAPIMethods {
  constructor(base: string) {
    super(base);
  }

  async getAsync(id: string): Promise<Chaincode_Client> {
    await OtherUtils.wait(1000);
    return __Data__.data.find(client => client.id === id) as Chaincode_Client;
  }

  async getMultipleAsync(): Promise<Array<Chaincode_Client>> {
    await OtherUtils.wait(1000);
    return __Data__.data as Array<Chaincode_Client>;
  }
}