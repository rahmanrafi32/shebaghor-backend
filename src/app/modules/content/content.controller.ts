import asyncTryCatch from '../../shared/asyncTryCatch';
import { Request, Response } from 'express';
import customResponse from '../../shared/customResponse';
import httpStatus from 'http-status';
import { contentService } from './content.service';

const addContent = asyncTryCatch(async (req: Request, res: Response) => {
  const result = await contentService.addContent(req.body);

  customResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Content added successfully',
    data: result,
  });
});

const getContent = asyncTryCatch(async (req: Request, res: Response) => {
  const result = await contentService.getContent();

  customResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,
  });
});

export const contentController = {
  addContent,
  getContent,
};
