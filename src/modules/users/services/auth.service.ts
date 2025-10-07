
// src/modules/users/services/auth.service.ts
import bcrypt from 'bcryptjs';
import prisma from '../../../core/prisma-client'; // استيراد prisma client
import { signToken } from '../utils/auth.utils';

export const login = async (email: string, password: string): Promise<{ token: string } | null> => {
  try {
    console.log('🔍 Attempting login for email:', email);
    
    // 1) البحث عن المستخدم باستخدام Prisma client
    const user = await prisma.user.findUnique({
      where: { email },
    });

    console.log('👤 User found:', user ? 'Yes' : 'No');

    if (!user) {
      console.log('❌ User not found');
      return null;
    }

    // 2) التحقق من وجود المستخدم ومقارنة كلمة المرور المشفرة
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log('🔐 Password valid:', isPasswordValid);

    if (!isPasswordValid) {
      console.log('❌ Invalid password');
      return null;
    }

    // 3) إذا كان كل شيء صحيحًا، قم بإنشاء وإرجاع التوكن باستخدام id الخاص بـ Prisma
    const token = signToken(user.id);
    console.log('✅ Login successful, token generated');

    return { token };
  } catch (error) {
    console.error('🚨 Login error:', error);
    return null;
  }
};