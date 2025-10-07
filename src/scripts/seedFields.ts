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

async function main() {
  console.log('🌱 Starting to seed the database with English field identifiers...');

  for (const field of fieldsToSeed) {
    await prisma.field.upsert({
      where: { name: field.name },
      update: {},
      create: { name: field.name },
    });
    console.log(`✅ Upserted field: ${field.name}`);
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