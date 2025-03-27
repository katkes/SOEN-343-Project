import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import { accountInfoController, loginController, logoutController } from '../controllers/auth';

const router = Router();

router.post('/login', loginController);
router.post('/logout', authenticate, logoutController);
router.get('/account-info', authenticate, accountInfoController);
export default router;
