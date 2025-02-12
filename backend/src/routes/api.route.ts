import { Router } from 'express';
import { TestController } from '../controllers/test.controller';
import userRoute from './user.route';
const router = Router();

// Test route controller
router.get('/', TestController);

// api/users/
router.use('/users', userRoute);

// Catch all route for api/ group.
router.all('*', (_, res) => {
  res.status(404).json({ error: 'Route not found.' });
});

export default router;
