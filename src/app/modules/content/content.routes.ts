import express from 'express';
import { contentController } from './content.controller';

const router = express.Router();

router.post('/', contentController.addContent);

router.get('/', contentController.getContent);
export const contentRoutes = router;
