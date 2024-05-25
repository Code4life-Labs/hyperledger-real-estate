// Import utils
import { BrowserStorageUtils } from "src/utils/browser_storage";

// Base Class
export class API {
  base!: string;

  constructor(base: string) {
    this.base = base;
  }

  getToken() {
    const token = BrowserStorageUtils.getItem(BrowserStorageUtils.getLocalStorageKey("token"));
    if(!token) {
      console.log("Not found token");
      return;
    }
    return token as string;
  }

  getAuthorization(token: string) {
    return { "Authorization": `Bearer ${token}` };
  }

  get [Symbol.toStringTag]() {
    return "API";
  }
}