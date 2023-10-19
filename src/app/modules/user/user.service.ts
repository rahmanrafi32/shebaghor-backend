import UserModel from './users.model';
import { IUser } from './user.interface';
import ApiError from '../../errorHandlers/ApiError';
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';

const getAllUser = async () => {
  return UserModel.find({ role: 'user' });
};

const getUserById = async (id: string) => {
  return UserModel.findById(id);
};

const getUserByEmail = async (userData: JwtPayload) => {
  return UserModel.findOne({ email: userData.user });
};

const updateSingleUser = async (id: string, payload: Partial<IUser>) => {
  const existingUser = await UserModel.findByIdAndUpdate({ _id: id }, payload, {
    new: true,
  });
  if (existingUser) {
    return existingUser;
  } else throw new ApiError(httpStatus.NOT_FOUND, 'User not found.');
};

const updateOwnProfile = async (
  userData: JwtPayload,
  payload: Partial<IUser>
) => {
  const { id } = userData;
  const existingUser = await UserModel.findByIdAndUpdate({ _id: id }, payload, {
    new: true,
  });
  if (existingUser) {
    return existingUser;
  } else throw new ApiError(httpStatus.NOT_FOUND, 'User not found.');
};

const deleteUser = async (id: string) => {
  const existingUser = await UserModel.findByIdAndDelete(id);
  if (existingUser) {
    return existingUser;
  } else throw new ApiError(httpStatus.NOT_FOUND, 'User not found.');
};

export const userService = {
  getAllUser,
  getUserById,
  updateSingleUser,
  deleteUser,
  updateOwnProfile,
  getUserByEmail,
};
