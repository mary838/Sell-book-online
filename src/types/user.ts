import { ObjectId } from "mongoose";

export interface IUser {
  _id?: ObjectId;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  roleId?: ObjectId | string;
  phone?: number;
  age?: number;
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreateUserInput {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  phone?: number;
  age?: number;
  roleId?: string;
  data?: Partial<IUser>;
}

export interface UserResult {
  success?: boolean;
  data?: IUser | IUser[];
  message?: string;
}
