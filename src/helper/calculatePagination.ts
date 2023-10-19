import {
  paginationReturn,
  paginationOption,
} from '../interfaces/paginationOptions';

const calculatePagination = (options: paginationOption): paginationReturn => {
  const { page = 1, limit = 10 } = options;
  const skip = (page - 1) * limit;

  return {
    page,
    limit,
    skip,
  };
};

export default calculatePagination;
