// src/modules/users/utils/auth.utils.ts
import jwt, { SignOptions, Secret } from 'jsonwebtoken';

// تم تغيير نوع المعرف (id) من Types.ObjectId إلى string ليتوافق مع Prisma
export const signToken = (id: string): string => {
  const jwtSecret = process.env.JWT_SECRET as Secret | undefined;
  const expiresIn = process.env.JWT_EXPIRES_IN as unknown as SignOptions['expiresIn'] | undefined;

  if (!jwtSecret || !expiresIn) {
    throw new Error('FATAL ERROR: JWT_SECRET or JWT_EXPIRES_IN is not defined.');
  }
  
  // الكود المصحح: expiresIn يجب أن يكون مفتاحًا في الكائن الرئيسي
  return jwt.sign({ id }, jwtSecret, { expiresIn });
};