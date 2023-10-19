import express from 'express';
import { authController } from './auth.controller';
import validateRequest from '../../middlewares/validateRequest';
import { createUser, signInUser } from './auth.validation';

const router = express.Router();

router.post('/signup', validateRequest(createUser), authController.signUp);
router.post('/sign-in', validateRequest(signInUser), authController.signIn);

export const authRoutes = router;
