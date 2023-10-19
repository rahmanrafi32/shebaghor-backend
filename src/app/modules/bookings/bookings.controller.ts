import asyncTryCatch from '../../shared/asyncTryCatch';
import { Request, Response } from 'express';
import customResponse from '../../shared/customResponse';
import httpStatus from 'http-status';
import { bookingService } from './bookings.service';

const createBooking = asyncTryCatch(async (req: Request, res: Response) => {
  const result = await bookingService.createBooking(req.body);

  customResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking created successfully',
    data: result,
  });
});

const getBookingById = asyncTryCatch(async (req: Request, res: Response) => {
  const result = await bookingService.getBookingById(req.user);

  customResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,
  });
});

const deleteBooking = asyncTryCatch(async (req: Request, res: Response) => {
  await bookingService.deleteBooking(req.params.id, req.user);

  customResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking Canceled successfully',
  });
});

const getAllBookings = asyncTryCatch(async (req: Request, res: Response) => {
  const result = await bookingService.getAllBookings();
  customResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking Canceled successfully',
    data: result,
  });
});

const changeBookingStatus = asyncTryCatch(
  async (req: Request, res: Response) => {
    const result = await bookingService.changeBookingStatus(
      req.params.id,
      req.body.status
    );
    customResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Booking status updated successfully',
      data: result,
    });
  }
);

const deleteBookingByAdmin = asyncTryCatch(
  async (req: Request, res: Response) => {
    await bookingService.deleteBookingByAdmin(req.params.id);

    customResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Booking rejected successfully',
    });
  }
);

export const bookingController = {
  createBooking,
  getBookingById,
  deleteBooking,
  getAllBookings,
  changeBookingStatus,
  deleteBookingByAdmin,
};
