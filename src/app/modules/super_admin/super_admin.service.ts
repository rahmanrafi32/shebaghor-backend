import { IUser } from '../user/user.interface';
import UserModel from '../user/users.model';
import ApiError from '../../errorHandlers/ApiError';
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';

const createAdmin = async (payload: IUser) => {
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

const getAllAdmins = async () => {
  return UserModel.find({ role: 'admin' });
};

const deleteAdmin = async (id: string) => {
  const isUserExist = await UserModel.findByIdAndDelete(id);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found.');
  } else return isUserExist;
};

const updateDetails = async (
  id: string,
  payload: Partial<IUser>,
  userData: JwtPayload
) => {
  const isExistingUser = await UserModel.findById(id);

  if (!isExistingUser)
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found.');

  const res = await UserModel.findOneAndUpdate(
    { _id: id, email: userData.user },
    payload,
    {
      new: true,
    }
  );

  if (res) {
    return res;
  } else throw new ApiError(httpStatus.UNAUTHORIZED, 'UNAUTHORIZED');
};

const getProfile = async (id: string, userData: JwtPayload) => {
  const isExistingUser = await UserModel.find({
    _id: id,
    email: userData.user,
  });

  if (!isExistingUser)
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found.');

  if (isExistingUser) {
    return isExistingUser;
  } else throw new ApiError(httpStatus.UNAUTHORIZED, 'UNAUTHORIZED');
};

const manageAdminRoles = async (id: string, payload: IUser) => {
  const isExistingUser = await UserModel.findOneAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
    }
  );

  if (!isExistingUser)
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found.');

  if (isExistingUser) {
    return isExistingUser;
  } else throw new ApiError(httpStatus.UNAUTHORIZED, 'UNAUTHORIZED');
};

export const superAdminService = {
  createAdmin,
  updateDetails,
  getProfile,
  manageAdminRoles,
  deleteAdmin,
  getAllAdmins,
};
