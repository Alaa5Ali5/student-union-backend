import { Router } from 'express';
import { validate } from '../../../core/middleware/validate';
import { createApplicationSchema, updateApplicationStatusSchema } from '../validators/application.validator';
import { 
    createApplicationHandler, 
    getAllApplicationsHandler, 
    getApplicationByIdHandler, 
    updateApplicationStatusHandler,
    validatePhoneNumberHandler
} from '../controllers/applications.controller';
import { protect, restrictTo } from '../../users/controllers/auth.middleware';

const router = Router();

// --- مسار عام ---
// أي شخص يمكنه تقديم طلب
router.post('/', validate(createApplicationSchema), createApplicationHandler);

// التحقق من رقم الهاتف (مسار عام)
router.post('/validate-phone', validatePhoneNumberHandler);

// --- مسارات محمية للمدير ---
router.use(protect, restrictTo('admin'));

router.get('/', getAllApplicationsHandler);
router.get('/:id', getApplicationByIdHandler);
router.patch('/:id', validate(updateApplicationStatusSchema), updateApplicationStatusHandler);

export default router;