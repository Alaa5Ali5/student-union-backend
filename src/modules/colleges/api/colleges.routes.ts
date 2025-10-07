import { Router } from 'express';
import { validate } from '../../../core/middleware/validate';
import { createCollegeSchema, updateCollegeSchema, collegeIdParamSchema } from '../validators/college.validator';
import { 
  createCollegeHandler, 
  getAllCollegesHandler, 
  getCollegeByIdHandler,
  updateCollegeHandler,
  deleteCollegeHandler
} from '../controllers/colleges.controller';
import { protect, restrictTo } from '../../users/controllers/auth.middleware';

const router = Router();

// --- المسارات العامة (لا تتطلب تسجيل الدخول) ---
// أي شخص يمكنه جلب قائمة الكليات لعرضها في الفورم
router.get('/', getAllCollegesHandler);
router.get('/:id', validate(collegeIdParamSchema), getCollegeByIdHandler);


// --- تطبيق طبقة الحماية على جميع المسارات القادمة ---
// من هنا فصاعدًا، يجب على المستخدم أن يكون مسجلاً دخوله (لديه توكن صالح)
router.use(protect);
// ويجب أن يكون دوره "admin"
router.use(restrictTo('admin'));


// --- المسارات المحمية (تتطلب تسجيل الدخول وصلاحيات المدير) ---

// POST /api/v1/colleges - إنشاء كلية جديدة (محمي)
router.post('/', validate(createCollegeSchema), createCollegeHandler);

// PUT /api/v1/colleges/:id - تحديث كلية محددة بالـ ID (محمي)
router.put('/:id', validate(updateCollegeSchema), updateCollegeHandler);

// DELETE /api/v1/colleges/:id - حذف كلية محددة بالـ ID (محمي)
router.delete('/:id', validate(collegeIdParamSchema), deleteCollegeHandler);

export default router;