import express, { Router } from 'express';
import { routesMap } from '../interfaces/routesMap';
import { authRoutes } from '../app/modules/auth/auth.routes';
import { superAdminRoutes } from '../app/modules/super_admin/super_admin.routes';
import { userRoutes } from '../app/modules/user/user.routes';
import { adminRoutes } from '../app/modules/admin/admin.routes';
import { serviceRoutes } from '../app/modules/service/service.routes';
import { bookingRoutes } from '../app/modules/bookings/bookings.routes';
import { feedbackRoutes } from '../app/modules/feedback/feedback.routes';
import { contentRoutes } from '../app/modules/content/content.routes';

const router: Router = express.Router();

const moduleRoutes: routesMap[] = [
  {
    path: '/auth',
    route: authRoutes,
  },
  {
    path: '/super-admin',
    route: superAdminRoutes,
  },
  {
    path: '/admin',
    route: adminRoutes,
  },
  {
    path: '/users',
    route: userRoutes,
  },
  {
    path: '/services',
    route: serviceRoutes,
  },
  {
    path: '/booking',
    route: bookingRoutes,
  },
  {
    path: '/feedback',
    route: feedbackRoutes,
  },
  {
    path: '/content',
    route: contentRoutes,
  },
];

moduleRoutes.forEach((route: routesMap): void => {
  router.use(route.path, route.route);
});

export default router;
