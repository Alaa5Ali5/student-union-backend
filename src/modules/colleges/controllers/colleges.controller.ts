import { Request, Response, NextFunction } from 'express';
import * as collegeService from '../services/colleges.service';

export const createCollegeHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const college = await collegeService.createCollege(req.body);
    res.status(201).json(college);
  } catch (error) {
    next(error);
  }
};

export const getAllCollegesHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log('🏫 Fetching all colleges...');
    const colleges = await collegeService.getAllColleges();
    console.log('✅ Colleges fetched:', colleges.length);
    res.status(200).json(colleges);
  } catch (error) {
    console.error('❌ Error fetching colleges:', error);
    next(error);
  }
};

export const getCollegeByIdHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const college = await collegeService.getCollegeById(req.params.id);
    if (!college) {
      return res.status(404).json({ message: 'College not found' });
    }
    res.status(200).json(college);
  } catch (error) {
    next(error);
  }
};

export const updateCollegeHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const college = await collegeService.updateCollege(req.params.id, req.body);
    if (!college) {
      return res.status(404).json({ message: 'College not found' });
    }
    res.status(200).json(college);
  } catch (error) {
    next(error);
  }
};

export const deleteCollegeHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const college = await collegeService.deleteCollege(req.params.id);
    if (!college) {
      return res.status(404).json({ message: 'College not found' });
    }
    res.status(204).send(); // 204 No Content هو الرد المناسب للحذف الناجح
  } catch (error) {
    next(error);
  }
};