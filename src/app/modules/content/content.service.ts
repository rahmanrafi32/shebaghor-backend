import ContentModel from './content.model';
import ApiError from '../../errorHandlers/ApiError';
import httpStatus from 'http-status';

type Content = {
  header: string;
  details: string;
};

const addContent = async (contentData: Content[]) => {
  try {
    await ContentModel.create(contentData);
  } catch (err) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Failed to add content.');
  }
};

const getContent = async () => {
  try {
    return ContentModel.find();
  } catch (err) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Failed to get content.');
  }
};

export const contentService = {
  addContent,
  getContent,
};
