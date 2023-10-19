import asyncTryCatch from '../../shared/asyncTryCatch';
import { Request, Response } from 'express';
import customResponse from '../../shared/customResponse';
import httpStatus from 'http-status';
import { feedbackService } from './feedback.service';

const giveFeedback = asyncTryCatch(async (req: Request, res: Response) => {
  const result = await feedbackService.giveFeedback(
    req.user,
    req.body.feedback
  );

  customResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Feedback received successfully',
    data: result,
  });
});

const getAllFeedbacks = asyncTryCatch(async (req: Request, res: Response) => {
  const result = await feedbackService.getAllFeedbacks();

  customResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Feedback received successfully',
    data: result,
  });
});

export const feedbackController = {
  giveFeedback,
  getAllFeedbacks,
};
