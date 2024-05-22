import Joi from 'joi'
import { ObjectId } from 'mongodb'
import { getDB } from '../database/database'
import { ICreateNewUser, IReqAddUser, IReqEditUser } from '../assets/interfaces/user.interface'
import { pagingSkipValue } from '../assets/utilities/algorithms'

const userCollectionName = 'users'
const userCollectionSchema = Joi.object({
  role: Joi.string().required(),
  username: Joi.string().required(),
  hashedPassword: Joi.string().required(),
  firstName: Joi.string(),
  lastName: Joi.string()
})

const validateSchema = async (data: ICreateNewUser) => {
  return await userCollectionSchema.validateAsync(data, { abortEarly: false })
}

const findOneById = async (id: string) => {
  try {
    const result = await getDB().collection(userCollectionName).findOne({ _id: new ObjectId(id) }, { projection: { _id: 1, username: 1, hashedPassword: 1, role: 0, firstName: 0, lastName: 0 } })
    return result
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
  }
}

const createNew = async (data: ICreateNewUser) => {
  try {
    const validatedValue = await validateSchema(data)
    const result = await getDB().collection(userCollectionName).insertOne(validatedValue)
    return result
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
  }
}

const update = async (id: string, data: IReqEditUser) => {
  try {
    const result = await getDB().collection(userCollectionName).findOneAndUpdate(
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

const findOneByUsername = async (username: string) => {
  try {
    const result = await getDB().collection(userCollectionName).findOne({ username: username })
    console.log("🚀 ~ findOneByUsername ~ result:", result)
    return result
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
  }
}

const getPaginationUsers = async (currentPage: number, itemsPerPage: number) => {
  try {
    const query = {};
    const options = {
      // skip x documents
      skip: pagingSkipValue(currentPage, itemsPerPage),
      // get with n limit documents
      limit: itemsPerPage
    }
    const result = await getDB()
      .collection(userCollectionName)
      .find(query, options);

    return result
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
  }
}

export const UserModel = {
  userCollectionName,
  createNew,
  update,
  findOneById,
  findOneByUsername,
  getPaginationUsers
}

