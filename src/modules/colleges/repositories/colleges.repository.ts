// src/modules/colleges/repositories/colleges.repository.ts
import prisma from '../../../core/prisma-client';
import { CollegeData } from '../services/colleges.service';

export const create = async (collegeData: CollegeData) => {
  return prisma.college.create({
    data: {
      name: collegeData.name,
      academicYearsCount: collegeData.academicYearsCount, // ++ إضافة: حفظ عدد السنوات
    },
  });
};

export const findAll = async () => {
  return prisma.college.findMany({
    orderBy: {
      name: 'asc', // ترتيب الكليات أبجدياً
    },
  });
};

export const findById = async (id: string) => {
  return prisma.college.findUnique({
    where: { id },
  });
};

export const updateById = async (id: string, updateData: Partial<CollegeData>) => {
  return prisma.college.update({
    where: { id },
    data: {
      name: updateData.name,
      academicYearsCount: updateData.academicYearsCount, // ++ إضافة: تحديث عدد السنوات
    },
  });
};

export const deleteById = async (id: string) => {
  return prisma.college.delete({
    where: { id },
  });
};