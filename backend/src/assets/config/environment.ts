import path from "path";

require('dotenv').config()

export const env = {
  APP_HOST: process.env.APP_HOST,
  APP_PORT: process.env.APP_PORT,
  BUILD_MODE: process.env.BUILD_MODE,
  // DATABASE
  CONNECT_STRING: process.env.CONNECT_STRING as string,
  DATABASE_NAME: process.env.DATABASE_NAME as string,
  // NET
  NETWORK_FILESYSTEM_ROOT: path.resolve(process.env.NETWORK_FILESYSTEM_ROOT as string),
  // JWT
  ACCESS_TOKEN_SECRET_SIGNATURE: process.env.ACCESS_TOKEN_SECRET_SIGNATURE as string,
  ACCESS_TOKEN_SECRET_LIFE: process.env.ACCESS_TOKEN_SECRET_LIFE as string,

  REFRESH_TOKEN_SECRET_SIGNATURE: process.env.REFRESH_TOKEN_SECRET_SIGNATURE as string,
  REFRESH_TOKEN_SECRET_LIFE: process.env.REFRESH_TOKEN_SECRET_LIFE as string,
}
