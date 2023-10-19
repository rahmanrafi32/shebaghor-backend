import asyncTryCatch from '../../shared/asyncTryCatch';
import { Request, Response } from 'express';
import customResponse from '../../shared/customResponse';
import httpStatus from 'http-status';
import { servicesService } from './service.service';
import pick from '../../shared/pick';

const filterAbleFields = ['searchTerm', 'price', 'category'];
const paginationFields = ['page', 'limit', 'sortBy', 'sortOrder'];

const createService = asyncTryCatch(async (req: Request, res: Response) => {
  const result = await servicesService.createService(req.body);

  customResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Service added successfully',
    data: result,
  });
});

const getAllServices = asyncTryCatch(async (req: Request, res: Response) => {
  const filters = pick(req.query, filterAbleFields);
  const paginationOptions = pick(req.query, paginationFields);
  const result = await servicesService.getAllServices(
    filters,
    paginationOptions
  );

  customResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,
  });
});

const getServiceById = asyncTryCatch(async (req: Request, res: Response) => {
  const result = await servicesService.getServiceById(req.params.id);

  customResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,
  });
});

const editService = asyncTryCatch(async (req: Request, res: Response) => {
  const result = await servicesService.editService(req.params.id, req.body);

  customResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'service edited successfully.',
    data: result,
  });
});

const addReview = asyncTryCatch(async (req: Request, res: Response) => {
  const result = await servicesService.addReview(req.params.id, req.body);

  customResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'feedback added successfully.',
    data: result,
  });
});

const deleteService = asyncTryCatch(async (req: Request, res: Response) => {
  const result = await servicesService.deleteService(req.params.id);
  customResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Service deleted successfully.',
    data: result,
  });
});

export const servicesController = {
  createService,
  getAllServices,
  getServiceById,
  editService,
  addReview,
  deleteService,
};
