export type HTTPMethods = "post" | "get" | "put" | "delete" | "patch";

export type HTTPStatus = {
  title: string;
  message?: string;
  code: number;
}

export type HTTPResponse<T> = {
  error: HTTPStatus | null;
  success: HTTPStatus | null;
  data: T | null;
}