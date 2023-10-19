import asyncTryCatch from '../../shared/asyncTryCatch';
import { Request, Response } from 'express';
import customResponse from '../../shared/customResponse';
import httpStatus from 'http-status';
import { superAdminService } from './super_admin.service';

const createAdmin = asyncTryCatch(async (req: Request, res: Response) => {
  const result = await superAdminService.createAdmin(req.body);

  customResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin created successfully',
    data: result,
  });
});

const updateDetails = asyncTryCatch(async (req: Request, res: Response) => {
  const result = await superAdminService.updateDetails(
    req.params.id,
    req.body,
    req.user
  );

  customResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Profile updated successfully',
    data: result,
  });
});

const getProfile = asyncTryCatch(async (req: Request, res: Response) => {
  const result = await superAdminService.getProfile(req.params.id, req.user);

  customResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,
  });
});

const manageAdminRoles = asyncTryCatch(async (req: Request, res: Response) => {
  const result = await superAdminService.manageAdminRoles(
    req.params.id,
    req.body
  );

  customResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin role updated',
    data: result,
  });
});

const deleteAdmin = asyncTryCatch(async (req: Request, res: Response) => {
  await superAdminService.deleteAdmin(req.params.id);

  customResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin deleted successfully',
  });
});

const getAllAdmins = asyncTryCatch(async (req: Request, res: Response) => {
  const result = await superAdminService.getAllAdmins();

  customResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,
  });
});

export const superAdminController = {
  createAdmin,
  updateDetails,
  deleteAdmin,
  getProfile,
  manageAdminRoles,
  getAllAdmins,
};
