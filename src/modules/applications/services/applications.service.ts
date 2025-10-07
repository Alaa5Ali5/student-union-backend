// src/modules/applications/services/applications.service.ts
import * as appRepo from '../repositories/applications.repository';
import { CreateApplicationData } from '../repositories/applications.repository';

// submitApplication الآن تستخدم النوع المعرف في المستودع
export const submitApplication = async (data: CreateApplicationData) => {
  // هنا يمكن إضافة أي منطق عمل، مثل إرسال بريد إلكتروني للتأكيد
  return await appRepo.create(data);
};

export const getAllApplications = () => {
  return appRepo.findAll();
};

export const getApplicationById = (id: string) => {
  return appRepo.findById(id);
};

export const updateApplicationStatus = (id: string, status: 'accepted' | 'rejected') => {
  return appRepo.updateStatus(id, status);
};

export const checkPhoneNumberExists = async (phoneNumber: string) => {
  return await appRepo.checkPhoneNumberExists(phoneNumber);
};