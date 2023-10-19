import { Model } from 'mongoose';

export type IUser = {
  id?: string;
  firstName: string;
  lastName: string;
  image: string;
  email: string;
  password: string;
  role: string;
  contactNo: string;
  houseNo: string;
  roadNo: string;
  floor: string;
  area: string;
};

export type IUserModel = {
  isUserExist(id: string): Promise<Partial<IUser>>;
  isPasswordMatched(givenPass: string, savedPass: string): Promise<boolean>;
} & Model<IUser>;
