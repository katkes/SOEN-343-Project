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
router.get('/:email', getUserByEmailController);
router.get('/speakers', getAllSpeakersController);
router.put('/edit', authenticate, updateProfileController);

export default router;
