import Joi from 'joi'
import { ObjectId } from 'mongodb'
import { getDB } from '../database/database'
import { ICreateNewUser, IReqAddUser, IReqEditUser } from '../assets/interfaces/user.interface'
import { pagingSkipValue } from '../assets/utilities/algorithms'

const userCollectionName = 'users'
const userCollectionSchema = Joi.object({ 
  walletId: Joi.string().required(),
  role: Joi.string().required(),
  username: Joi.string().required(),
  hashedPassword: Joi.string().required(),
  firstName: Joi.string(),
  lastName: Joi.string(),
  birthDate: Joi.string().default("01/01/1970")
})

const userProjections = {
  restrict: { _id: 1, role: 1, firstName: 1, lastName: 1, birthDate: 1, walletId: 1 }
}

const validateSchema = async (data: ICreateNewUser) => {
  return await userCollectionSchema.validateAsync(data, { abortEarly: false })
}

const findOneById = async (id: string) => {
  try {
    const result = await getDB().collection(userCollectionName).findOne(
      { _id: new ObjectId(id) },
      { projection: userProjections.restrict }
    );

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

const updateOneById = async (id: string, data: IReqEditUser) => {
  try {
    const result = await getDB().collection(userCollectionName).findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: data },
      { returnDocument: 'after' }
    )
    return result ? result.value : result
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
  }
}

const findOneByUsername = async (username: string) => {
  try {
    const result = await getDB().collection(userCollectionName).findOne(
      { username: username },
      { projection: userProjections.restrict }
    )
    console.log("🚀 ~ findOneByUsername ~ projection:", userProjections.restrict);
    console.log("🚀 ~ findOneByUsername ~ result:", result)
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
    const cursor = getDB().collection(userCollectionName).find(
      { _id: { $in: objectIds } },
      { projection: userProjections.restrict }
    )
    // Get latest documents
    .sort({ _id: -1 });

    return cursor.toArray();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
  }
}

const getPaginationUsers = async (limit: string = "10", skip: string = "0") => {
  try {
    const query = {};
    const options = {
      // skip x documents
      skip: parseInt(skip),
      // get with n limit documents
      limit: parseInt(limit)
    }
    const cursor = getDB()
      .collection(userCollectionName)
      .find(query, options)
      // Get latest documents
      .sort({ _id: -1 });

    return cursor.toArray()
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
  }
}

const deleteAll = async () => {
  try {
    const result = await getDB().collection(userCollectionName).deleteMany({})
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
  updateOneById,
  findOneById,
  findOneByUsername,
  getPaginationUsers,
  deleteAll,
  findManyByIds
}

