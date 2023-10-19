import ServiceModel, { IServices } from './service.model';
import ApiError from '../../errorHandlers/ApiError';
import httpStatus from 'http-status';
import { IReview } from './service.interface';
import calculatePagination from '../../../helper/calculatePagination';
import { SortOrder } from 'mongoose';

type IFilter = {
  searchTerm?: string;
  price?: number;
  category?: string;
};

type paginationOption = {
  page?: number;
  limit?: number;
  sortBy?: string | undefined;
  sortOrder?: SortOrder;
};

const searchableFields = ['name'];
const createService = async (payload: IServices) => {
  await ServiceModel.create(payload);
};
const getAllServices = async (
  filters: IFilter,
  paginationOptions: paginationOption
) => {
  const { searchTerm, ...filtersData } = filters;
  const { limit, skip } = calculatePagination(paginationOptions);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: searchableFields.map((field) => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => {
        return {
          [field]: value,
        };
      }),
    });
  }

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  return ServiceModel.find(whereConditions)
    .sort({ createdAt: 'desc' })
    .skip(skip)
    .limit(limit);
};
const getServiceById = async (id: string) => {
  return ServiceModel.findById(id);
};
const editService = async (id: string, payload: Partial<IServices>) => {
  const isExistingService = await ServiceModel.findById(id);

  if (!isExistingService)
    throw new ApiError(httpStatus.NOT_FOUND, 'Service not found.');

  const res = await ServiceModel.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });

  if (res) {
    return res;
  } else throw new ApiError(httpStatus.UNAUTHORIZED, 'UNAUTHORIZED');
};
const addReview = async (id: string, { reviews }: IReview) => {
  const isExistingService = await ServiceModel.findById(id);

  if (!isExistingService)
    throw new ApiError(httpStatus.NOT_FOUND, 'Service not found.');

  const res = await ServiceModel.findOneAndUpdate(
    { _id: id },
    { $push: { reviews } },
    {
      new: true,
    }
  );

  if (res) {
    return res;
  } else throw new ApiError(httpStatus.UNAUTHORIZED, 'UNAUTHORIZED');
};
const deleteService = async (id: string) => {
  return ServiceModel.findByIdAndDelete(id);
};

export const servicesService = {
  createService,
  getAllServices,
  getServiceById,
  editService,
  addReview,
  deleteService,
};
