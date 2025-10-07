# Student Union Backend API

Backend API للاتحاد الطلابي - جامعة طرطوس

## الوصف

هذا هو الباك إند لتطبيق اتحاد الطلابي الذي يدعم:
- إدارة الطلبات
- إدارة الكليات
- نظام المصادقة
- API للواجهة الأمامية

## التقنيات المستخدمة

- **Node.js** - بيئة التشغيل
- **Express.js** - إطار العمل
- **TypeScript** - لغة البرمجة
- **Prisma** - ORM لقاعدة البيانات
- **MySQL** - قاعدة البيانات
- **Zod** - التحقق من صحة البيانات
- **JWT** - المصادقة

## التثبيت والتشغيل

### المتطلبات
- Node.js (الإصدار 18 أو أحدث)
- MySQL
- npm أو yarn

### خطوات التثبيت

1. **استنساخ المستودع**
```bash
git clone <repository-url>
cd student-union-backend
```

2. **تثبيت التبعيات**
```bash
npm install
```

3. **إعداد متغيرات البيئة**
```bash
cp .env.example .env
# قم بتحرير ملف .env وإضافة القيم المطلوبة
```

4. **إعداد قاعدة البيانات**
```bash
# إنشاء قاعدة البيانات
npx prisma migrate deploy

# بذر البيانات الأساسية
npm run db:seed
```

5. **إنشاء مستخدم مدير**
```bash
npm run create-admin
```

6. **تشغيل الخادم**
```bash
# للتطوير
npm run dev

# للإنتاج
npm run build
npm start
```

## متغيرات البيئة المطلوبة

```env
DATABASE_URL="mysql://username:password@localhost:3306/student_union"
JWT_SECRET="your-jwt-secret-key"
PORT=3000
NODE_ENV=development
```

## API Endpoints

### الطلبات
- `POST /api/v1/applications` - إرسال طلب جديد
- `GET /api/v1/applications` - جلب جميع الطلبات (مدير)
- `GET /api/v1/applications/:id` - جلب طلب محدد (مدير)
- `PATCH /api/v1/applications/:id` - تحديث حالة الطلب (مدير)

### الكليات
- `GET /api/v1/colleges` - جلب جميع الكليات
- `POST /api/v1/colleges` - إنشاء كلية جديدة (مدير)
- `PUT /api/v1/colleges/:id` - تحديث كلية (مدير)
- `DELETE /api/v1/colleges/:id` - حذف كلية (مدير)

### المصادقة
- `POST /api/v1/users/login` - تسجيل الدخول
- `POST /api/v1/users/register` - تسجيل مستخدم جديد (مدير)

## هيكل المشروع

```
src/
├── core/                 # المكونات الأساسية
│   ├── middleware/       # الميدلوير
│   └── prisma-client.ts  # عميل Prisma
├── modules/              # وحدات التطبيق
│   ├── applications/     # وحدة الطلبات
│   ├── colleges/         # وحدة الكليات
│   └── users/            # وحدة المستخدمين
└── scripts/              # السكريبتات المساعدة
```

## التطوير

### إضافة ميزة جديدة
1. أنشئ وحدة جديدة في `src/modules/`
2. أضف الراوتر في `src/server.ts`
3. أنشئ الاختبارات
4. حدث التوثيق

### الاختبار
```bash
npm test
```

### بناء المشروع
```bash
npm run build
```

## المساهمة

1. Fork المشروع
2. أنشئ branch للميزة الجديدة (`git checkout -b feature/amazing-feature`)
3. Commit التغييرات (`git commit -m 'Add some amazing feature'`)
4. Push إلى Branch (`git push origin feature/amazing-feature`)
5. افتح Pull Request

## الترخيص

هذا المشروع مرخص تحت رخصة MIT - راجع ملف [LICENSE](LICENSE) للتفاصيل.

## التواصل

لأي استفسارات أو مساعدة، يرجى التواصل مع فريق التطوير.
