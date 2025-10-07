// src/modules/colleges/services/colleges.service.ts
import * as collegeRepository from '../repositories/colleges.repository';

// تحديث النوع ليعكس الحقول الجديدة
export interface CollegeData {
  name: string;
  academicYearsCount: number;
}

export const createCollege = async (collegeData: CollegeData) => {
  return collegeRepository.create(collegeData);
};

export const getAllColleges = async () => {
  return collegeRepository.findAll();
};

export const getCollegeById = async (id: string) => {
  return collegeRepository.findById(id);
};

export const updateCollege = async (id: string, updateData: Partial<CollegeData>) => {
  return collegeRepository.updateById(id, updateData);
};

export const deleteCollege = async (id: string) => {
  return collegeRepository.deleteById(id);
};