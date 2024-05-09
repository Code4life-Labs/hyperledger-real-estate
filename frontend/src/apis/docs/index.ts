import { API } from "src/classes/API";

// Import utils
import { OtherUtils } from "src/utils/other";

// Import data for testing
import DocumentMenu from "src/assets/document_menu.json";

// Import types
import type { IAPIMethods } from "src/types/API";

export type DocumentOutlineItemData = {
  title: string;
  value: string;
}

export type DocumentOutlineData = {
  title: string;
  value: string;
  items: Array<DocumentOutlineItemData>;
}

export class DocsAPI extends API implements IAPIMethods {
  constructor(base: string) {
    super(base);
  }

  async getMultipleAsync(): Promise<Array<DocumentOutlineData>> {
    await OtherUtils.wait(1000);
    return DocumentMenu.data;
  }
}