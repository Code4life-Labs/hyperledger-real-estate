export interface IReqEditUser {
  role?: string;
  username?: string;
  hashedPassword?: string;
  firstName?: string;
  lastName?: string;
}

export interface IReqAddUser {
  walletId: string;
  role: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  birthDate: string;
}


export interface ICreateNewUser {
  walletId: string;
  role: string;
  username: string;
  hashedPassword: string;
  firstName: string;
  lastName: string;
  birthDate: string;
}