import { ICreateNewUser, IReqAddUser, IReqEditUser } from "../assets/interfaces/user.interface";
import { DEFAULT_CURRENT_PAGE, DEFAULT_ITEMS_PER_PAGE } from "../assets/utilities/constants";
import { UserModel } from "../models/user.model";
import bcryptjs from 'bcryptjs'

const getUser = async (userId: string) => {
  try {
    const result = await UserModel.findOneById(userId);
    return result;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
  }
}

const updateUser = async (userId: string, data: IReqEditUser) => {
  try {
    await UserModel.update(userId, data);
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
      role: 'user',
      username: data.username,
      hashedPassword: bcryptjs.hashSync(data.password, 8),
      firstName: data.firstName,
      lastName: data.lastName
    }

    await UserModel.createNew(userData);
    return "Create success user!";
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
  }
}

const getUsers = async (currentPage: number, itemsPerPage: number) => {
  try {
    if (!currentPage) currentPage = DEFAULT_CURRENT_PAGE
    if (!itemsPerPage) itemsPerPage = DEFAULT_ITEMS_PER_PAGE

    const results = await UserModel.getPaginationUsers(
      currentPage,
      itemsPerPage,
    )

    return results

  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
  }
}


export const UserService = {
  getUser,
  updateUser,
  addUser,
  getUsers
}
