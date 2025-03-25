import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import { purchaseTicket } from '../controllers/payment';

const router = Router();

router.post('/', authenticate, purchaseTicket);

export default router;
