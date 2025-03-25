import { Router } from 'express';
import { createUserController, getUserByEmailController } from '../controllers/user';

const router = Router();

router.post('/', createUserController);
router.get('/:email', getUserByEmailController);

export default router;
