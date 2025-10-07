// src/scripts/initDefaultAdmin.ts
import prisma from '../core/prisma-client';
import bcrypt from 'bcryptjs';

/**
 * إنشاء حساب Admin افتراضي إذا لم يكن موجوداً
 * يتم استدعاء هذه الدالة عند بدء الخادم
 */
export async function initDefaultAdmin() {
  try {
    // بيانات Admin الافتراضية
    const DEFAULT_ADMIN_EMAIL = 'admin@nuss.sy';
    const DEFAULT_ADMIN_PASSWORD = 'Admin@NUSS2025'; // كلمة مرور قوية

    // التحقق من وجود Admin
    const existingAdmin = await prisma.user.findUnique({
      where: { email: DEFAULT_ADMIN_EMAIL },
    });

    if (existingAdmin) {
      console.log('✅ Default admin account already exists');
      return;
    }

    // إنشاء Admin جديد
    const hashedPassword = await bcrypt.hash(DEFAULT_ADMIN_PASSWORD, 10);
    
    await prisma.user.create({
      data: {
        email: DEFAULT_ADMIN_EMAIL,
        password: hashedPassword,
        role: 'admin',
      },
    });

    console.log('✅ Default admin account created successfully!');
    console.log('📧 Email:', DEFAULT_ADMIN_EMAIL);
    console.log('🔑 Password:', DEFAULT_ADMIN_PASSWORD);
    console.log('⚠️  Please change the password after first login!');
  } catch (error) {
    console.error('❌ Error creating default admin:', error);
    // لا نرمي الخطأ لأننا لا نريد إيقاف الخادم
  }
}

