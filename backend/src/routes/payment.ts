import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import { purchaseTicket, getSessionStatus } from '../controllers/payment';

const router = Router();

router.post('/', authenticate, purchaseTicket);
router.get('/session-status', getSessionStatus);

export default router;
