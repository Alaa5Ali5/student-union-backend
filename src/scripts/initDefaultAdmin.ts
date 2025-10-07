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

    console.log('🔍 Checking for default admin account...');

    // التحقق من وجود Admin
    const existingAdmin = await prisma.user.findUnique({
      where: { email: DEFAULT_ADMIN_EMAIL },
    });

    if (existingAdmin) {
      console.log('✅ Default admin account already exists');
      console.log('📧 Email:', DEFAULT_ADMIN_EMAIL);
      console.log('🔑 Password: Admin@NUSS2025');
      
      // اختبار كلمة المرور
      const testPassword = await bcrypt.compare(DEFAULT_ADMIN_PASSWORD, existingAdmin.password);
      console.log('🧪 Password test result:', testPassword);
      
      return;
    }

    // إنشاء Admin جديد
    console.log('🆕 Creating new admin account...');
    const hashedPassword = await bcrypt.hash(DEFAULT_ADMIN_PASSWORD, 10);
    console.log('🔐 Password hashed successfully');
    
    const newAdmin = await prisma.user.create({
      data: {
        email: DEFAULT_ADMIN_EMAIL,
        password: hashedPassword,
        role: 'admin',
      },
    });

    console.log('✅ Default admin account created successfully!');
    console.log('📧 Email:', DEFAULT_ADMIN_EMAIL);
    console.log('🔑 Password:', DEFAULT_ADMIN_PASSWORD);
    console.log('🆔 Admin ID:', newAdmin.id);
    console.log('⚠️  Please change the password after first login!');
    
    // اختبار فوري
    const immediateTest = await bcrypt.compare(DEFAULT_ADMIN_PASSWORD, hashedPassword);
    console.log('🧪 Immediate password test:', immediateTest);
  } catch (error) {
    console.error('❌ Error creating default admin:', error);
    // لا نرمي الخطأ لأننا لا نريد إيقاف الخادم
  }
}

