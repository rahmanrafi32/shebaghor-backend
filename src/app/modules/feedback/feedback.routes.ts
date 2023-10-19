import express from 'express';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { feedbackController } from './feedback.controller';

const router = express.Router();

router.post('/', auth(ENUM_USER_ROLE.USER), feedbackController.giveFeedback);

router.get('/', feedbackController.getAllFeedbacks);
export const feedbackRoutes = router;
