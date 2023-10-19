import { Request, Response } from 'express';
import asyncTryCatch from '../../shared/asyncTryCatch';
import { adminService } from './admin.service';
import customResponse from '../../shared/customResponse';
import httpStatus from 'http-status';

const createUser = asyncTryCatch(async (req: Request, res: Response) => {
  const result = await adminService.createUser(req.body);

  customResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User created successfully',
    data: result,
  });
});

const updateUserDetails = asyncTryCatch(async (req: Request, res: Response) => {
  const result = await adminService.updateUserDetails(req.params.id, req.body);

  customResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User details updated successfully',
    data: result,
  });
});

export const adminController = {
  createUser,
  updateUserDetails,
};
