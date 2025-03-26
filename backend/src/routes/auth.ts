import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import { loginController, logoutController } from '../controllers/auth';

const router = Router();

router.post('/login', loginController);
router.post('/logout', authenticate, logoutController);

export default router;
