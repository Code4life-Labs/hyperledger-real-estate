import Joi from 'joi'
import { ObjectId } from 'mongodb'
import { getDB } from '../database/database'
import { clientSchema } from '../schemas/client.schema'
import { IReqAddEditClient } from '../assets/interfaces/client.interface'

const clientCollectionName = 'clients'

const validateSchema = async (data: IReqAddEditClient) => {
  return await clientSchema.addEditClientSchema.validateAsync(data, { abortEarly: false })
}

const findOneById = async (id: string) => {
  try {
    const result = await getDB().collection(clientCollectionName).findOne({ _id: new ObjectId(id) })
    console.log("🚀 ~ findOneById ~ result:", result)
    return result
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
  }
}

const createNew = async (data: IReqAddEditClient) => {
  try {
    const validatedValue = await validateSchema(data)

    const result = await getDB().collection(clientCollectionName).insertOne(validatedValue)
    return result
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
  }
}

const update = async (id: string, data: IReqAddEditClient) => {
  try {
    const result = await getDB().collection(clientCollectionName).findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: data },
      { returnDocument: 'after' }
    )
    return result.value
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
  }
}

export const ClientModel = {
  clientCollectionName,
  createNew,
  update,
  findOneById,
}

