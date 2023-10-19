import { Request, Response } from 'express';
import asyncTryCatch from '../../shared/asyncTryCatch';
import { authService } from './auth.service';
import customResponse from '../../shared/customResponse';
import httpStatus from 'http-status';

const signUp = asyncTryCatch(async (req: Request, res: Response) => {
  const result = await authService.signUp(req.body);

  customResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User created successfully',
    data: result,
  });
});

const signIn = asyncTryCatch(async (req: Request, res: Response) => {
  const result = await authService.signIn(req.body);

  customResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User logged in successfully',
    data: result.accessToken,
  });
});

export const authController = {
  signUp,
  signIn,
};
