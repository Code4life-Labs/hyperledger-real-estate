import { ICreateNewUser, IReqAddUser, IReqEditUser } from "../assets/interfaces/user.interface";
import { UserModel } from "../models/user.model";
import bcryptjs from 'bcryptjs'

const getUserById = async (userId: string) => {
  try {
    const result = await UserModel.findOneById(userId);
    return result;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
  }
}

const updateUserById = async (userId: string, data: IReqEditUser) => {
  try {
    await UserModel.updateOneById(userId, data);
    return "Update success user!";
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
  }
}

const addUser = async (data: IReqAddUser) => {
  try {
    const existUser = await UserModel.findOneByUsername(data.username)
    if (existUser) {
      throw new Error('Username already exist.')
    }
    const userData: ICreateNewUser = {
      walletId: data.walletId,
      role: data.role,
      username: data.username,
      hashedPassword: bcryptjs.hashSync(data.password, 8),
      firstName: data.firstName,
      lastName: data.lastName,
      birthDate: data.birthDate
    }
    
    return await UserModel.createNew(userData);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
  }
}

const getUsers = async (limit: string, skip: string) => {
  try {
    const results = await UserModel.getPaginationUsers(limit, skip)

    return results

  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
  }
}

const getUsersWithIds = async (ids: Array<string>) => {
  try {
    const results = await UserModel.findManyByIds(ids)

    return results
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
  }
}

const deleteUsers = async () => {
  try {
    await UserModel.deleteAll();
    return "Delete all users!";
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
  }
}

export const UserService = {
  getUserById,
  updateUserById,
  addUser,
  getUsers,
  deleteUsers,
  getUsersWithIds
}