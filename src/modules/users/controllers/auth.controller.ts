import { Request, Response, NextFunction } from 'express';
import * as authService from '../services/auth.service';

export const loginHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    const result = await authService.login(email, password);

    if (!result) {
      return res.status(401).json({ message: 'Incorrect email or password' });
    }

    res.status(200).json({
      status: 'success',
      token: result.token,
    });
  } catch (error) {
    next(error);
  }
};

export const createAdminHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password, secretKey } = req.body;

    // التحقق من وجود البيانات المطلوبة
    if (!email || !password || !secretKey) {
      return res.status(400).json({ 
        message: 'Please provide email, password, and secretKey' 
      });
    }

    // التحقق من المفتاح السري
    const ADMIN_SECRET = process.env.ADMIN_SECRET_KEY || 'NUSS_ADMIN_2025_SECRET';
    if (secretKey !== ADMIN_SECRET) {
      return res.status(403).json({ 
        message: 'Invalid secret key' 
      });
    }

    // إنشاء Admin
    const admin = await authService.createAdmin(email, password);

    res.status(201).json({
      status: 'success',
      message: 'Admin created successfully',
      admin: {
        id: admin.id,
        email: admin.email,
        role: admin.role
      }
    });
  } catch (error: any) {
    if (error.message === 'Admin already exists') {
      return res.status(409).json({ message: 'Admin with this email already exists' });
    }
    next(error);
  }
};