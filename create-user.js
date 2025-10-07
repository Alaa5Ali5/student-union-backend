const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function createUser() {
  try {
    const email = 'admin@test.com';
    const password = 'admin123';
    
    // حذف المستخدم إذا كان موجوداً
    await prisma.user.deleteMany({ where: { email } });
    
    const hashedPassword = await bcrypt.hash(password, 12);
    
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role: 'admin'
      }
    });
    
    console.log('✅ Admin created:', user.email);
    console.log('Password:', password);
    console.log('User ID:', user.id);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createUser();
