import { z } from 'zod';

export const createCollegeSchema = z.object({
  body: z.object({
    name: z.string().min(1, { message: 'College name is required' }),
    // ++ إضافة: التحقق من عدد السنوات الدراسية ++
    academicYearsCount: z.number().int().min(1, 'Number of years must be at least 1').max(10, 'Number of years cannot exceed 10'),
    // -- تعديل: جعل التخصصات اختيارية عند الإنشاء --
    specializations: z.array(z.string().min(1, { message: 'Specialization cannot be empty' }))
      .optional(),
  }),
});

export const updateCollegeSchema = z.object({
  body: z.object({
    name: z.string().min(1, { message: 'College name must not be empty if provided' }).optional(),
    // ++ إضافة: التحقق من عدد السنوات الدراسية في التحديث ++
    academicYearsCount: z.number().int().min(1).max(10).optional(),
    specializations: z.array(z.string().min(1, { message: 'Specialization cannot be empty' }))
      .optional(),
  }),
  params: z.object({
    id: z.string().min(1, { message: 'College ID is required' }),
  }),
});

export const collegeIdParamSchema = z.object({
  params: z.object({
    id: z.string().min(1, { message: 'College ID is required' }),
  }),
});