import { Router } from 'express';
import {
  createUserController,
  getUserByEmailController,
  getAllSpeakersController,
  updateProfileController,
  getEventsRegisteredByUserController,
} from '../controllers/user';
import { authenticate } from '../middleware/auth';

const router = Router();

router.post('/', createUserController); // Route for creating a user: http://localhost:3000/api/users
router.get('/speakers', getAllSpeakersController); // Route for retrieving all speakers: http://localhost:3000/api/users/speakers
router.get('/:email', getUserByEmailController); // Route for retrieving a user by email: http://localhost:3000/api/users/:email
router.get('/:id/registeredEvents', getEventsRegisteredByUserController); // Route for retrieving events registered by a user: http://localhost:3000/api/users/:id/registeredEvents
router.put('/edit', authenticate, updateProfileController);

export default router;
