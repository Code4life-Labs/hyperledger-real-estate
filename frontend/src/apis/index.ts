import { DocsAPI } from "./docs";

const __ROOT__ = import.meta.env.API_ROOT;

const __ChaincodeAPIPaths__ = {
  Docs: __ROOT__ + ""
}

export const Docs_API = new DocsAPI(__ROOT__);