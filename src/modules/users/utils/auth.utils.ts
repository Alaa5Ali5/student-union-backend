// src/modules/users/utils/auth.utils.ts
import jwt, { SignOptions, Secret } from 'jsonwebtoken';

// تم تغيير نوع المعرف (id) من Types.ObjectId إلى string ليتوافق مع Prisma
export const signToken = (id: string): string => {
  const jwtSecret = process.env.JWT_SECRET as Secret | undefined;
  const expiresIn = (process.env.JWT_EXPIRES_IN || '7d') as unknown as SignOptions['expiresIn'];

  if (!jwtSecret) {
    throw new Error('FATAL ERROR: JWT_SECRET is not defined. Please add it to environment variables.');
  }
  
  console.log('🔐 JWT_SECRET found:', jwtSecret ? 'Yes' : 'No');
  console.log('⏰ JWT_EXPIRES_IN:', expiresIn);
  
  // الكود المصحح: expiresIn يجب أن يكون مفتاحًا في الكائن الرئيسي
  return jwt.sign({ id }, jwtSecret, { expiresIn });
};