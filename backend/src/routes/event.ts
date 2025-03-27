import { Router } from 'express';
import { createEventController } from '../controllers/event';

const router = Router();

router.post('/', createEventController);

export default router;
