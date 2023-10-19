import asyncTryCatch from '../../shared/asyncTryCatch';
import { Request, Response } from 'express';
import { userService } from './user.service';
import customResponse from '../../shared/customResponse';
import httpStatus from 'http-status';

const getAllUsers = asyncTryCatch(async (req: Request, res: Response) => {
  const result = await userService.getAllUser();

  customResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,
  });
});

const getUserById = asyncTryCatch(async (req: Request, res: Response) => {
  const result = await userService.getUserById(req.params.id);

  customResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,
  });
});

const getUserByEmail = asyncTryCatch(async (req: Request, res: Response) => {
  const result = await userService.getUserByEmail(req.user);

  customResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,
  });
});

const updateSingleUser = asyncTryCatch(async (req: Request, res: Response) => {
  const result = await userService.updateSingleUser(req.params.id, req.body);

  customResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User details updated successfully.',
    data: result,
  });
});

const updateOwnProfile = asyncTryCatch(async (req: Request, res: Response) => {
  const result = await userService.updateOwnProfile(req.user, req.body);

  customResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Profile updated successfully.',
    data: result,
  });
});

const deleteUser = asyncTryCatch(async (req: Request, res: Response) => {
  const result = await userService.deleteUser(req.params.id);

  customResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User deleted successfully.',
    data: result,
  });
});

export const userController = {
  getAllUsers,
  getUserById,
  updateSingleUser,
  deleteUser,
  getUserByEmail,
  updateOwnProfile,
};
