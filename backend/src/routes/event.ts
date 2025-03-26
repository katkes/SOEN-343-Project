import { Router } from 'express';
import { createEventController, getAllEventsController } from '../controllers/event';

const router = Router();

router.post('/', createEventController);
router.get('/', getAllEventsController); // Route for retrieving all events

export default router;
