import { Router } from 'express';
import { User } from '../models/user';

const router = Router();

router.get('/getAllSpeakers', async (req, res) => {
  try {
    const speakers = await User.find({ role: 'Speaker' });
    res.json(speakers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching speakers', error });
  }
});

export default router;
