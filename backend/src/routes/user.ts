import { Router } from 'express';
import {
  createUserController,
  getUserByEmailController,
  getAllSpeakersController,
  updateProfileController,
} from '../controllers/user';
import { authenticate } from '../middleware/auth';

const router = Router();

router.post('/', createUserController);
router.get('/speakers', getAllSpeakersController);
router.get('/:email', getUserByEmailController);
router.put('/edit', authenticate, updateProfileController);

export default router;
