import { Request, Response, NextFunction } from 'express';
import * as appService from '../services/applications.service';

export const createApplicationHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const application = await appService.submitApplication(req.body);
        res.status(201).json({ 
            message: 'تم إرسال الطلب بنجاح!', 
            applicationId: application.id,
            status: 'success'
        });
    } catch (error: any) {
        // معالجة خاصة لخطأ "رقم الهاتف مكرر" في Prisma + MySQL
        if (error.code === 'P2002' && error.meta?.target?.includes('phoneNumber')) {
            return res.status(409).json({ 
                message: 'رقم الهاتف هذا مستخدم مسبقاً في طلب آخر. يرجى استخدام رقم هاتف مختلف.',
                field: 'phoneNumber',
                code: 'PHONE_NUMBER_EXISTS'
            });
        }
        
        // معالجة أخطاء Prisma الأخرى
        if (error.code === 'P2002') {
            return res.status(409).json({ 
                message: 'البيانات المرسلة مكررة. يرجى التحقق من المعلومات المدخلة.',
                code: 'DUPLICATE_DATA'
            });
        }
        
        console.error('Application creation error:', error);
        next(error);
    }
};

export const getAllApplicationsHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const applications = await appService.getAllApplications();
        res.status(200).json(applications);
    } catch (error) {
        next(error);
    }
};

export const getApplicationByIdHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const app = await appService.getApplicationById(req.params.id);
        if (!app) return res.status(404).json({ message: 'Application not found' });
        res.status(200).json(app);
    } catch (error) {
        next(error);
    }
};

export const updateApplicationStatusHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const app = await appService.updateApplicationStatus(req.params.id, req.body.status);
        if (!app) return res.status(404).json({ message: 'Application not found' });
        res.status(200).json(app);
    } catch (error) {
        next(error);
    }
};

export const validatePhoneNumberHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { phoneNumber } = req.body;
        
        if (!phoneNumber) {
            return res.status(400).json({ 
                message: 'رقم الهاتف مطلوب',
                isValid: false 
            });
        }
        
        const exists = await appService.checkPhoneNumberExists(phoneNumber);
        
        res.status(200).json({
            isValid: !exists,
            message: exists ? 'رقم الهاتف مستخدم مسبقاً' : 'رقم الهاتف متاح'
        });
    } catch (error) {
        next(error);
    }
};