import express from 'express';
import validateRequest from '../../middlewares/validateRequest';

import { superAdminController } from './super_admin.controller';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { createUser, updateUser } from '../auth/auth.validation';

const router = express.Router();
router.get(
  '/get-profile/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  superAdminController.getProfile
);

router.get(
  '/',
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  superAdminController.getAllAdmins
);

router.post(
  '/create-admin',
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  validateRequest(createUser),
  superAdminController.createAdmin
);

router.patch(
  '/manage-admin/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  validateRequest(updateUser),
  superAdminController.manageAdminRoles
);

router.patch(
  '/edit-profile/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  validateRequest(updateUser),
  superAdminController.updateDetails
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  superAdminController.deleteAdmin
);

export const superAdminRoutes = router;
