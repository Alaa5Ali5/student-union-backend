import { Request, Response, NextFunction } from 'express';
import * as authService from '../services/auth.service';

export const loginHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    console.log('📨 Login request received');
    console.log('📧 Email:', email);
    console.log('🔑 Password length:', password ? password.length : 0);

    if (!email || !password) {
      console.log('❌ Missing email or password');
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    const result = await authService.login(email, password);

    if (!result) {
      console.log('❌ Login failed - result is null');
      return res.status(401).json({ message: 'Incorrect email or password' });
    }

    console.log('✅ Login successful, sending token');
    res.status(200).json({
      status: 'success',
      token: result.token,
    });
  } catch (error) {
    console.error('🚨 Login handler error:', error);
    next(error);
  }
};