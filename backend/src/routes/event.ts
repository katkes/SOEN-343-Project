import { Router } from 'express';
import {
  createEventController,
  getAllEventsController,
  getEventByIdController,
  getTicketsByEventIDController,
  updateEventController,
} from '../controllers/event';

const router = Router();

router.post('/', createEventController);
router.get('/', getAllEventsController); // Route for retrieving all events: http://localhost:3000/api/event
router.get('/:id', getEventByIdController); // Route for retrieving a single event: http://localhost:3000/api/event/:id
// IF updateEventContrller INDICATES A COMPILER ERROR ON YOUR IDE, IGNORE IT SINCE EVERYTHING WORKS FINE
router.put('/:id/updateEvent', updateEventController); // Route for updating an event: http://localhost:3000/api/event/:id/updateEvent
router.get('/:id/tickets', getTicketsByEventIDController); // Route for retrieving all tickets for a specific event: http://localhost:3000/api/event/:id/tickets

export default router;
