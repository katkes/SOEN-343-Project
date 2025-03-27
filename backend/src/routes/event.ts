import { Router } from 'express';
import {
  createEventController,
  getAllEventsController,
  getEventByIdController,
} from '../controllers/event';

const router = Router();

router.post('/', createEventController);
router.get('/', getAllEventsController); // Route for retrieving all events: http://localhost:3000/api/event
router.get('/:id', getEventByIdController); // Route for retrieving a single event: http://localhost:3000/api/event/:id

export default router;
