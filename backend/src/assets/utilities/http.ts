// Import types
import type { HTTPStatus, HTTPResponse, HTTPMethods } from "../../types/http.types";

const Methods = {
  get: "get",
  post: "post",
  put: "put",
  delete: "delete",
  patch: "patch"
};

const StatusCodes: {[key: number]: HTTPStatus} = {
  200: {
    code: 200,
    title: "OK"
  },
  201: {
    code: 201,
    title: "Created"
  },
  202: {
    code: 202,
    title: "Accepted"
  },
  203: {
    code: 203,
    title: "Non-Authoritative Information"
  },
  204: {
    code: 204,
    title: "No Content"
  },
  205: {
    code: 205,
    title: "Reset Content"
  },
  206: {
    code: 206,
    title: "Partial Content"
  },
  207: {
    code: 207,
    title: "Multi-Status"
  },
  208: {
    code: 208,
    title: "Already Reported"
  },
  226: {
    code: 226,
    title: "IM Used"
  },
  400: {
    code: 400,
    title: "Bad Request"
  },
  401: {
    code: 401,
    title: "Unauthorized"
  },
  402: {
    code: 402,
    title: "Payment Required"
  },
  403: {
    code: 403,
    title: "Forbidden"
  },
  404: {
    code: 404,
    title: "Not Found"
  },
  405: {
    code: 405,
    title: "Method Not Allowed"
  },
  406: {
    code: 406,
    title: "Not Acceptable"
  },
  407: {
    code: 407,
    title: "Proxy Authentication Required"
  },
  408: {
    code: 408,
    title: "Request Timeout"
  },
  409: {
    code: 409,
    title: "Conflict"
  },
  410: {
    code: 410,
    title: "Gone"
  },
  411: {
    code: 411,
    title: "Length Required"
  },
  412: {
    code: 412,
    title: "Prediction Failed"
  },
  413: {
    code: 413,
    title: "Payload Too Large"
  },
  414: {
    code: 414,
    title: "URI Too Long"
  },
  415: {
    code: 415,
    title: "Unsupported Media Type"
  },
  429: {
    code: 429,
    title: "Too Many Request"
  },
  500: {
    code: 500,
    title: "Internal Server Error"
  }
};

function isValidHTTPMethod(method: HTTPMethods) {
  return Boolean(Methods[method]);
}

function generateHTTPResponse<T>(code: number, data?: T, message?: string) {
  if(!Boolean(StatusCodes[code]))
    throw new Error(`[${code}] isn't a valid HTTP Code`);

  let responseObject: HTTPResponse<T> = {
    data: data ? data : null,
    error: null,
    success: null
  };

  if(code >= 200 && code < 300) {
    responseObject.success = StatusCodes[code];
  }

  if(code >= 400 && code < 500 || code >= 500 && code < 600) {
    responseObject.error = StatusCodes[code];
  }

  if(message && responseObject.success) {
    responseObject.success.message = message;
  } else if(message && responseObject.error) {
    responseObject.error.message = message;
  }

  return responseObject;
}

export const HTTPUtils = {
  Methods,
  StatusCodes,
  isValidHTTPMethod,
  generateHTTPResponse
}