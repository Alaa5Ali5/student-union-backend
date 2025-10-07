// src/scripts/createAdmin.ts
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

// ++ تعديل: تحديد مسار ملف .env بشكل صريح لضمان تحميله بشكل صحيح
dotenv.config({ path: '.env' });

const prisma = new PrismaClient();

const createAdmin = async () => {
  try {
    console.log('Connecting to the database...');

    // ++ تعديل: قراءة الإيميل وكلمة المرور من متغيرات البيئة
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminEmail || !adminPassword) {
      console.error('❌ ADMIN_EMAIL and ADMIN_PASSWORD must be set in your .env file.');
      return;
    }

    const adminExists = await prisma.user.findUnique({
      where: { email: adminEmail },
    });

    if (adminExists) {
      console.log(`Admin user with email ${adminEmail} already exists.`);
      return;
    }

    const hashedPassword = await bcrypt.hash(adminPassword, 12);

    const newAdmin = await prisma.user.create({
      data: {
        email: adminEmail,
        password: hashedPassword,
        role: 'admin',
      },
    });

    console.log('✅ Admin user created successfully!');
    console.log(`   Email: ${newAdmin.email}`);
    console.log(`   Password: ${adminPassword} (Use this password to log in)`);

  } catch (error) {
    console.error('❌ Error creating admin user:', error);
  } finally {
    await prisma.$disconnect();
    console.log('Disconnected from the database.');
  }
};

createAdmin();