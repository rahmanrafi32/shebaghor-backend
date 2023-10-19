import ApiError from '../../errorHandlers/ApiError';
import httpStatus from 'http-status';
import { IUser } from '../user/user.interface';
import UserModel from '../user/users.model';

const createUser = async (payload: IUser) => {
  const { email } = payload;
  const isUserExist = await UserModel.isUserExist(email);

  if (isUserExist)
    throw new ApiError(
      httpStatus.NOT_FOUND,
      'User is already exist with this email.'
    );
  const newUser = await UserModel.create(payload);
  return UserModel.findById(newUser._id);
};

const updateUserDetails = async (id: string, payload: Partial<IUser>) => {
  const isExistingUser = await UserModel.findById(id);

  if (!isExistingUser)
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found.');

  const res = await UserModel.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });

  if (res) {
    return res;
  } else throw new ApiError(httpStatus.UNAUTHORIZED, 'UNAUTHORIZED');
};

export const adminService = {
  createUser,
  updateUserDetails,
};
