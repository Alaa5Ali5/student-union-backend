// src/scripts/seedFields.ts
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

const prisma = new PrismaClient();

// ++ تعديل: استخدام معرفات إنجليزية ثابتة للمجالات
const fieldsToSeed = [
  { name: 'photography' },
  { name: 'voiceover' },
  { name: 'montage' },
  { name: 'graphic_design' },
  { name: 'content_writing' },
  { name: 'social_media' },
  { name: 'live_streaming' },
];

// كليات افتراضية للبدء
const collegesToSeed = [
  { name: 'كلية الهندسة', academicYearsCount: 5 },
  { name: 'كلية الطب', academicYearsCount: 7 },
  { name: 'كلية الآداب', academicYearsCount: 4 },
  { name: 'كلية العلوم', academicYearsCount: 4 },
  { name: 'كلية الحقوق', academicYearsCount: 4 },
  { name: 'كلية الاقتصاد', academicYearsCount: 4 },
  { name: 'كلية الصيدلة', academicYearsCount: 5 },
  { name: 'كلية طب الأسنان', academicYearsCount: 5 },
  { name: 'كلية التربية', academicYearsCount: 4 },
  { name: 'كلية الفنون الجميلة', academicYearsCount: 4 },
];

async function main() {
  console.log('🌱 Starting to seed the database...');

  // Seed Fields
  console.log('📝 Seeding Fields...');
  for (const field of fieldsToSeed) {
    await prisma.field.upsert({
      where: { name: field.name },
      update: {},
      create: { name: field.name },
    });
    console.log(`✅ Upserted field: ${field.name}`);
  }

  // Seed Colleges
  console.log('🏫 Seeding Colleges...');
  for (const college of collegesToSeed) {
    await prisma.college.upsert({
      where: { name: college.name },
      update: { academicYearsCount: college.academicYearsCount },
      create: { 
        name: college.name,
        academicYearsCount: college.academicYearsCount,
      },
    });
    console.log(`✅ Upserted college: ${college.name}`);
  }

  console.log('🚀 Seeding finished successfully!');
}

main()
  .catch((e) => {
    console.error('❌ An error occurred while seeding the database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    console.log('Disconnected from the database.');
  });