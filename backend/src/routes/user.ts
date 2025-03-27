import { Router } from 'express';
import {
  createUserController,
  getUserByEmailController,
  getAllSpeakersController,
} from '../controllers/user';

const router = Router();

router.post('/', createUserController);
router.get('/:email', getUserByEmailController);
router.get('/speakers', getAllSpeakersController);

export default router;
