// src/server.ts
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

// استيراد المسارات (لا يوجد تغيير هنا)
import collegeRoutes from './modules/colleges/api/colleges.routes';
import userRoutes from './modules/users/api/users.routes';
import applicationRoutes from './modules/applications/api/applications.routes';

// تحميل متغيرات البيئة
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// --- Routes ---
app.use('/api/v1/colleges', collegeRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/applications', applicationRoutes);

app.get('/', (req, res) => {
  res.send('Student Union API is running with MySQL + Prisma!');
});

// Error handling middleware
app.use((error: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Unhandled error:', error);
  
  // Prisma errors
  if (error.code === 'P2002') {
    return res.status(409).json({
      message: 'البيانات المرسلة مكررة. يرجى التحقق من المعلومات المدخلة.',
      code: 'DUPLICATE_DATA'
    });
  }
  
  if (error.code === 'P2025') {
    return res.status(404).json({
      message: 'العنصر المطلوب غير موجود.',
      code: 'NOT_FOUND'
    });
  }
  
  // Default error response
  res.status(500).json({
    message: 'حدث خطأ داخلي في الخادم. يرجى المحاولة مرة أخرى لاحقاً.',
    code: 'INTERNAL_SERVER_ERROR'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    message: 'المسار المطلوب غير موجود.',
    code: 'NOT_FOUND'
  });
});

// تشغيل السيرفر مباشرة بدون انتظار اتصال قاعدة البيانات
// Prisma تقوم بإدارة الاتصالات تلقائيًا عند كل استعلام
app.listen(port, () => {
  console.log(`✅ Server is running on http://localhost:${port}`);
});