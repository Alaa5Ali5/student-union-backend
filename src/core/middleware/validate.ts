import { Request, Response, NextFunction } from 'express';
import { ZodObject, ZodError } from 'zod';

export const validate = (schema: ZodObject<any>) => 
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (error) {
      // التحقق من أن الخطأ هو من نوع ZodError قبل التعامل معه
      if (error instanceof ZodError) {
        return res.status(400).json({
          message: "Input validation failed",
          // .flatten() لتنظيم الأخطاء بشكل يسهل قراءته في الواجهة الأمامية
          errors: error.flatten().fieldErrors,
        });
      }
      
      // إذا كان الخطأ من نوع آخر غير متوقع، مرره إلى معالج الأخطاء العام
      // (سنقوم ببنائه لاحقًا)
      next(error);
    }
};