import { Router } from 'express';
import { loginHandler, createAdminHandler } from '../controllers/auth.controller';

const router = Router();

router.post('/login', loginHandler);
router.post('/create-admin', createAdminHandler);

export default router;