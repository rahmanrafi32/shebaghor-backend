import express from 'express';
import { bookingController } from './bookings.controller';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';

const router = express.Router();

router.post('/', bookingController.createBooking);

router.get('/', auth(ENUM_USER_ROLE.USER), bookingController.getBookingById);
router.get(
  '/all-bookings',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  bookingController.getAllBookings
);

router.patch(
  '/edit-status/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  bookingController.changeBookingStatus
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.USER),
  bookingController.deleteBooking
);

router.delete(
  '/delete-booking/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  bookingController.deleteBookingByAdmin
);
export const bookingRoutes = router;
