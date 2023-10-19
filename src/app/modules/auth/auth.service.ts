import config from '../../../config';
import ApiError from '../../errorHandlers/ApiError';
import httpStatus from 'http-status';
import { jwtHelpers } from '../../../helper/jwtHelper';
import { Secret } from 'jsonwebtoken';
import { IUser } from '../user/user.interface';
import UserModel from '../user/users.model';

const signUp = async (payload: IUser) => {
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

const signIn = async (payload: IUser) => {
  const { email, password } = payload;
  const isUserExist = await UserModel.isUserExist(email);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  if (
    isUserExist.password &&
    !(await UserModel.isPasswordMatched(password, isUserExist.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
  }

  const { email: user, role, id } = isUserExist;

  const accessToken = jwtHelpers.createToken(
    { user, role, id },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return {
    accessToken,
  };
};

export const authService = {
  signUp,
  signIn,
};
