import { Schema, model, Types } from 'mongoose';

const bookingSchema = new Schema(
  {
    user: {
      type: Types.ObjectId,
      ref: 'User',
      required: true,
    },
    service: {
      type: Types.ObjectId,
      ref: 'Service',
      required: true,
    },
    bookingTime: {
      type: String,
      required: true,
    },
    totalAmount: {
      type: String,
      required: true,
    },
    bookingStatus: {
      type: String,
      default: 'pending',
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: {
      virtuals: true,
    },
  }
);

export const BookingModel = model('Booking', bookingSchema);
