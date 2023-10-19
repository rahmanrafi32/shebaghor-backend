import Feedback from './feedback.model';
import { JwtPayload } from 'jsonwebtoken';
import ApiError from '../../errorHandlers/ApiError';
import httpStatus from 'http-status';

const giveFeedback = async (userData: JwtPayload, feedback: string) => {
  const { id } = userData;
  try {
    const feedbackData = new Feedback({
      feedbackerId: id,
      feedback,
    });

    return await feedbackData.save();
  } catch (error) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Failed to save feedback');
  }
};

const getAllFeedbacks = async () => {
  try {
    return Feedback.find()
      .populate({
        path: 'feedbackerId',
        select: 'firstName lastName image',
      })
      .exec();
  } catch (error) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Failed to save feedback');
  }
};

export const feedbackService = {
  giveFeedback,
  getAllFeedbacks,
};
