import { IBooking } from './bookings.interface';
import { BookingModel } from './bookings.model';
import ApiError from '../../errorHandlers/ApiError';
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import mongoose from 'mongoose';

const createBooking = async (payload: IBooking) => {
  const { user, service, bookingTime, totalAmount } = payload;
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const existingBooking = await BookingModel.findOne({
      service,
      bookingTime,
    }).session(session);

    if (existingBooking) {
      throw new ApiError(
        httpStatus.NOT_FOUND,
        'Service is already booked for this date'
      );
    }

    const newBooking = new BookingModel({
      user,
      service,
      bookingTime,
      totalAmount,
      bookingStatus: 'pending',
    });

    await newBooking.save({ session });

    await session.commitTransaction();
    await session.endSession();

    return newBooking;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new ApiError(httpStatus.NOT_FOUND, error.message);
  }
};

const getBookingById = async (userData: JwtPayload) => {
  try {
    const bookingDetails = await BookingModel.find({
      user: userData.id,
    })
      .populate({
        path: 'user',
        select: 'firstName lastName contactNo houseNo roadNo floor area',
      })
      .populate({ path: 'service', select: 'name price' })
      .exec();

    if (!bookingDetails) {
      return [];
    }
    return bookingDetails;
  } catch (err) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Something went wrong');
  }
};

const deleteBooking = async (id: string, userData: JwtPayload) => {
  const bookingDetails = await BookingModel.findOneAndDelete({
    _id: id,
    user: userData.id,
  }).exec();

  if (!bookingDetails) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Booking not found');
  } else return bookingDetails;
};

const getAllBookings = async () => {
  const bookingDetails = await BookingModel.find()
    .populate({
      path: 'user',
      select: 'firstName lastName email contactNo houseNo roadNo floor area',
    })
    .populate({ path: 'service', select: 'name price' });

  if (!bookingDetails) {
    return [];
  } else return bookingDetails;
};

const changeBookingStatus = async (id: string, status: string) => {
  const bookingDetails = await BookingModel.findOneAndUpdate(
    {
      _id: id,
    },
    { bookingStatus: status },
    {
      new: true,
    }
  );

  if (!bookingDetails) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Booking not found.');
  } else return bookingDetails;
};

const deleteBookingByAdmin = async (id: string) => {
  const bookingDetails = await BookingModel.findOneAndDelete({
    _id: id,
  }).exec();

  if (!bookingDetails) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Booking not found');
  } else return bookingDetails;
};

export const bookingService = {
  createBooking,
  getBookingById,
  deleteBooking,
  getAllBookings,
  changeBookingStatus,
  deleteBookingByAdmin,
};
