import { Router } from 'express';
import { createCompanyController } from '../controllers/company';

const router = Router();

router.post('/', createCompanyController);

export default router;
