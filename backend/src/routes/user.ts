import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import {
  createUserController,
  getUserByEmailController,
  updateProfileController,
} from '../controllers/user';

const router = Router();

router.post('/', createUserController);
router.get('/:email', getUserByEmailController);
router.put('/edit', authenticate, updateProfileController);

export default router;
