import { z } from 'zod';

export const createApplicationSchema = z.object({
  body: z.object({
    fullName: z.string().min(3, "Full name is required and must be at least 3 characters"),
    phoneNumber: z.string().regex(/^09\d{8}$/, "Invalid Syrian phone number format"),
    college: z.string().min(1, "College selection is required"),
    // السماح بإرسال السنة كسلسلة من الفرونت وتحويلها لرقم
    academicYear: z.coerce.number().int().min(1).max(7, "Invalid academic year"),
    interestedFields: z.array(z.string()).nonempty({ message: "You must select at least one field of interest" }),
    hasExperience: z.boolean(),
    // السماح بـ null بالإضافة إلى undefined
    experienceDetails: z.string().nullable().optional(),
    // جعل الروابط مصفوفة افتراضية فارغة إذا لم تُرسل
    portfolioLinks: z.array(z.string().url("One of the portfolio links is invalid")).default([]),
    // السماح بـ null بالإضافة إلى undefined
    equipmentDetails: z.string().nullable().optional(),
    reasonToJoin: z.string().min(20, "Reason must be at least 20 characters long"),
    // ++ إضافة: إضافة حقل الموافقة هنا ليتطابق مع الفرونت إند
    consent: z.boolean().refine(val => val === true, { message: 'Consent is required' }),
  })
  .superRefine((data, ctx) => {
    if (data.hasExperience && (!data.experienceDetails || data.experienceDetails.trim().length < 10)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "تفاصيل الخبرة مطلوبة ويجب أن تحتوي على 10 أحرف على الأقل",
        path: ["experienceDetails"],
      });
    }
  }),
});

export const updateApplicationStatusSchema = z.object({
  body: z.object({
    status: z.enum(['accepted', 'rejected'], {
      message: 'Status is required and must be either accepted or rejected'
    }),
  }),
  params: z.object({
    id: z.string().min(1, "Application ID is required"),
  }),
});