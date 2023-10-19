import express from 'express';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import validateRequest from '../../middlewares/validateRequest';
import ServiceSchema from './service.validation';
import { servicesController } from './service.controller';

const router = express.Router();

router.post(
  '/create-service',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(ServiceSchema),
  servicesController.createService
);
router.post('/add-review/:id', servicesController.addReview);

router.get('/', servicesController.getAllServices);
router.get('/:id', servicesController.getServiceById);
router.patch(
  '/edit-service/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  servicesController.editService
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  servicesController.deleteService
);

export const serviceRoutes = router;
