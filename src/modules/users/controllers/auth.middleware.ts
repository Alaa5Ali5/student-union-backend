// src/modules/users/controllers/auth.middleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import prisma from '../../../core/prisma-client';
import { User } from '@prisma/client'; // استيراد نوع المستخدم مباشرة من Prisma Client

// توسيع واجهة Request في Express لتشمل خاصية user من نوع Prisma
declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

interface JwtPayload {
  id: string;
}

export const protect = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // 1) الحصول على التوكن والتحقق من وجوده
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({ message: 'You are not logged in! Please log in to get access.' });
    }

    // 2) التحقق من صحة التوكن
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;

    // 3) التحقق من أن المستخدم ما زال موجودًا باستخدام Prisma
    const currentUser = await prisma.user.findUnique({
      where: { id: decoded.id },
    });
    
    if (!currentUser) {
      return res.status(401).json({ message: 'The user belonging to this token does no longer exist.' });
    }

    // تم التحقق بنجاح، أرفق المستخدم بالطلب
    req.user = currentUser;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token. Please log in again.' });
  }
};

// 4.2 Middleware للتحقق من الصلاحيات (Authorization)
export const restrictTo = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // التحقق من صلاحية المستخدم المرفق بالطلب
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'You do not have permission to perform this action' });
    }
    next();
  };
};