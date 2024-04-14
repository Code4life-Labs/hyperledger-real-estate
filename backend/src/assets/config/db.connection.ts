import mysql, { Connection } from 'mysql2'
import { env } from './environment'

// const mysqlPool = mysql.createPool({
//   host: env.DB_HOST,
//   port: env.DB_PORT,
//   user: env.DB_USER,
//   password: env.DB_PASSWORD,
//   database: env.DB_NAME,
//   waitForConnections: true,
//   connectionLimit: 10,
//   maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
//   idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
//   queueLimit: 0,
//   enableKeepAlive: true,
//   keepAliveInitialDelay: 0
// })

// export default mysqlPool

export const connection: Connection = mysql.createConnection({
  host: env.DB_HOST,
  user: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
});