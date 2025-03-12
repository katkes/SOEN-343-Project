import { Router } from 'express';
import {
  createUserController,
  getUserByEmailController,
  loginController,
  logoutController,
} from '../controllers/user';
import { authenticate } from '../middleware/auth';

const router = Router();

router.post('/', createUserController);
router.post('/login', loginController);
router.post('/logout', authenticate, logoutController);
router.get('/:email', getUserByEmailController);

export default router;
