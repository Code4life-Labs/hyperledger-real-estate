import { env } from '../config/environment'

interface HttpStatusCodeTemplate {
  OK: number;
  BAD_REQUEST: number;
  UNAUTHORIZED: number;
  NOT_FOUND: number;
  INTERNAL_SERVER: number;
  EXPIRED: number;
}

export const HttpStatusCode: HttpStatusCodeTemplate = {
  OK: 200,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  INTERNAL_SERVER: 500,
  EXPIRED: 410 //GONE
}

export const DEFAULT_ITEMS_PER_PAGE = 12
export const DEFAULT_CURRENT_PAGE = 1