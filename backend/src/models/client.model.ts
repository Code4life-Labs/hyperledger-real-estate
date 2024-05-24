import Joi from 'joi'
import { ObjectId } from 'mongodb'
import { getDB } from '../database/database'
import { clientSchema } from '../schemas/client.schema'
import { IReqAddEditClient } from '../assets/interfaces/client.interface'

import { pagingSkipValue } from '../assets/utilities/algorithms'

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

const findManyByIds = async (ids: Array<string>) => {
  try {
    const objectIds = ids.map(id => new ObjectId(id));
    const cursor = getDB().collection(clientCollectionName).find(
      { _id: { $in: objectIds } }
    )

    return cursor.toArray();
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

const updateOneById = async (id: string, data: IReqAddEditClient) => {
  try {
    const result = await getDB().collection(clientCollectionName).findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: data },
      { returnDocument: 'after' }
    )
    if(!result) return null
    return result.value
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
  }
}

const getPaginationClients = async (limit: string = "10", skip: string = "0") => {
  try {
    const query = {};
    const options = {
      // skip x documents
      skip: parseInt(skip),
      // get with n limit documents
      limit: parseInt(limit)
    }
    const cursor = getDB()
      .collection(clientCollectionName)
      .find(query, options);

    return cursor.toArray();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
  }
}

export const ClientModel = {
  clientCollectionName,
  createNew,
  updateOneById,
  findOneById,
  getPaginationClients,
  findManyByIds
}

