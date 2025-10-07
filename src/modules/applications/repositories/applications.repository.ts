// src/modules/applications/repositories/applications.repository.ts
import prisma from '../../../core/prisma-client';

export interface CreateApplicationData {
  fullName: string;
  phoneNumber: string;
  college: string;
  academicYear: number;
  interestedFields: string[];
  hasExperience: boolean;
  experienceDetails?: string | null; // ++ تعديل: السماح بـ null
  portfolioLinks: string[];
  equipmentDetails?: string | null; // ++ تعديل: السماح بـ null
  reasonToJoin: string;
  consent: boolean; // ++ إضافة: حقل الموافقة ناقص
}

export const create = async (data: CreateApplicationData) => {
  // التحقق من أن المجالات المرسلة موجودة بالفعل (تم إنشاؤها عبر الـ seed)
  const existingFields = await prisma.field.findMany({
    where: {
      name: {
        in: data.interestedFields,
      },
    },
  });

  // إذا كان عدد المجالات الموجودة لا يطابق عدد المجالات المرسلة، فهذا يعني أن هناك مجالاً غير صالح
  if (existingFields.length !== data.interestedFields.length) {
    throw new Error('One or more interested fields are invalid.');
  }

  const fieldConnections = existingFields.map(field => ({ id: field.id }));

  return prisma.application.create({
    data: {
      fullName: data.fullName,
      phoneNumber: data.phoneNumber,
      college: data.college,
      academicYear: data.academicYear,
      hasExperience: data.hasExperience,
      experienceDetails: data.experienceDetails,
      equipmentDetails: data.equipmentDetails,
      reasonToJoin: data.reasonToJoin,
      // Prisma لا يحتاج حقل الموافقة، لذا لا نمرره هنا
      
      portfolioLinks: {
        create: data.portfolioLinks.map(linkUrl => ({ url: linkUrl })),
      },
      interestedFields: {
        connect: fieldConnections,
      },
    },
    include: {
        interestedFields: true,
        portfolioLinks: true,
    }
  });
};

// ... باقي الدوال تبقى كما هي ...
export const findAll = () => {
  return prisma.application.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      interestedFields: {
        select: { name: true }
      },
      portfolioLinks: {
        select: { url: true }
      },
    },
  });
};

export const findById = (id: string) => {
  return prisma.application.findUnique({
    where: { id },
    include: {
      interestedFields: true,
      portfolioLinks: true,
    },
  });
};

export const updateStatus = (id: string, status: 'accepted' | 'rejected') => {
  return prisma.application.update({
    where: { id },
    data: { status },
  });
};

export const checkPhoneNumberExists = async (phoneNumber: string): Promise<boolean> => {
  const existingApplication = await prisma.application.findUnique({
    where: { phoneNumber },
    select: { id: true }
  });
  return !!existingApplication;
};