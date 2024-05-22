export interface IReqEditUser {
  role?: string;
  username?: string;
  hashedPassword?: string;
  firstName?: string;
  lastName?: string;
}

export interface IReqAddUser {
  username: string;
  password: string;
  firstName?: string;
  lastName?: string;
}


export interface ICreateNewUser {
  role: string;
  username: string;
  hashedPassword: string;
  firstName?: string;
  lastName?: string;
}