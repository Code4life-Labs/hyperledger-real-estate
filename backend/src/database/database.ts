import { MongoClient } from 'mongodb'
import { env } from '../assets/config/environment'

let dbInstance: any = null

export const connectDB = async () => {
  const client = new MongoClient(env.CONNECT_STRING)

  // Connect the client to the server
  await client.connect()

  // Assign clientDB to our dbInstance
  dbInstance = client.db(env.DATABASE_NAME)
}

// Get Database Instance
export const getDB = () => {
  if (!dbInstance) throw new Error('Must connect to Database first!')
  return dbInstance
}
