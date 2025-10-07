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