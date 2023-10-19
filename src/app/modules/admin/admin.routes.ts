import express from 'express';
import { adminController } from './admin.controller';
import validateRequest from '../../middlewares/validateRequest';
import { createUser } from './admin.validation';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { updateUser } from '../auth/auth.validation';

const router = express.Router();

router.post(
  '/create-user',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(createUser),
  adminController.createUser
);

router.patch(
  '/update-user-details/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(updateUser),
  adminController.updateUserDetails
);

export const adminRoutes = router;
