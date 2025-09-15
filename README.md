# 📋 نظام إدارة قوائم الموظفين | Employee Management System

نظام شامل لإدارة قوائم الموظفين مع إمكانيات طباعة وتحميل الوثائق الرسمية باللغة العربية.

## ✨ المميزات الرئيسية

### 🏢 إدارة الموظفين
- عرض شامل لبيانات الموظفين
- فلترة متقدمة حسب التعيين والقسم
- واجهة عربية متكاملة مع دعم RTL

### 📄 إنتاج الوثائق
- **طباعة مباشرة**: تصميم رسمي مطابق للوثائق الحكومية
- **تحميل Word**: ملفات `.docx` بتنسيق احترافي
- **عناوين ديناميكية**: تتغير حسب الفلاتر المختارة
- **جداول منظمة**: 5 أعمدة (القسم، الأشغال المسندة، التعيين، الدرجة، الاسم)

### 🎯 نظام الفلترة
- فلترة حسب **التعيين** (Assignment)
- فلترة حسب **القسم** (Service/Department)
- فلترة مزدوجة (Assignment + Service)
- عرض فوري لعدد الموظفين المفلترين

## 🛠️ التقنيات المستخدمة

```json
{
  "Frontend": "React 19 + TypeScript",
  "Build Tool": "Vite",
  "Styling": "CSS Modules",
  "Icons": "Lucide React",
  "Word Generation": "docx library",
  "File Download": "file-saver",
  "Language Support": "Arabic RTL"
}
```

## 📦 التثبيت والإعداد

### متطلبات النظام
```bash
Node.js >= 18.0.0
npm >= 9.0.0
```

### خطوات التثبيت

1. **استنساخ المشروع**
```bash
git clone https://github.com/anwar-bouchehboun/Liste_des_salari-s-.git
cd projettps
```

2. **تثبيت التبعيات**
```bash
npm install
```

3. **تشغيل المشروع**
```bash
npm run dev
```

4. **فتح المتصفح**
```
http://localhost:5173
```

## 📁 هيكل المشروع

```
src/
├── components/
│   ├── EmployeeTab.tsx      # واجهة إدارة الموظفين
│   ├── PrintModal.tsx       # نافذة الطباعة والتحميل
│   └── PrintModal.css       # تنسيقات النافذة
├── services/
│   └── WordDocumentService.ts # خدمة إنتاج ملفات Word
├── types/
│   └── index.ts             # تعريف أنواع البيانات
└── assets/                  # الملفات الثابتة
```

## 🔧 الاستخدام

### 1. عرض الموظفين
- قائمة شاملة بجميع بيانات الموظفين
- فلترة تفاعلية بالوقت الفعلي
- واجهة عربية محسنة

### 2. طباعة الوثائق
```typescript
// فتح نافذة الطباعة
const handlePrint = () => {
  setShowPrintModal(true);
};
```

### 3. تحميل ملفات Word
```typescript
// تحميل ملف Word مفلتر
await WordDocumentService.generateEmployeeReport(
  employees, 
  selectedAssignment, 
  selectedService
);
```

## 📋 مثال على البيانات

```typescript
interface Employee {
  id: string;
  personalName: string;          // الاسم الشخصي والعائلي
  grade: string;                 // الدرجة
  assignment: string;            // التعيين
  position: string;              // الأشغال المسندة
  service: string;               // القسم
}
```

## 🎨 تخصيص التصميم

### تخصيص العناوين
```typescript
// في WordDocumentService.ts
let titleLines = ['لائحة الموظفين المستفيدين من التعويض'];
if (assignment && service) {
  titleLines.push(`ب${assignment}`);
  titleLines.push(`ب${service}`);
}
```

### تخصيص التنسيق
```css
/* في PrintModal.css */
.print-modal {
  direction: rtl;
  font-family: 'Arial', sans-serif;
}
```

## 📱 التصميم المتجاوب

- دعم كامل للشاشات المختلفة
- تصميم محسن للطباعة (A4)
- واجهة متكيفة مع الأجهزة المحمولة

## 🔒 الأمان

- فلترة آمنة للبيانات
- تحقق من صحة المدخلات
- حماية من هجمات XSS

## 🚀 الأداء

- تحميل سريع للبيانات
- فلترة محسنة
- تحسين لمحركات البحث

## 📄 أمثلة على المخرجات

### عنوان بدون فلاتر
```
لائحة الموظفين المستفيدين من التعويض
```

### عنوان مع التعيين
```
لائحة الموظفين المستفيدين من التعويض
بمديرية التعليم
```

### عنوان مع التعيين والقسم
```
لائحة الموظفين المستفيدين من التعويض
بمديرية التعليم
بقسم الموارد البشرية
```

## 🛡️ اختبار الجودة

```bash
# فحص الكود
npm run lint

# بناء المشروع
npm run build

# معاينة البناء
npm run preview
```

## 📝 المساهمة

1. Fork المشروع
2. إنشاء branch جديد (`git checkout -b feature/AmazingFeature`)
3. Commit التغييرات (`git commit -m 'Add some AmazingFeature'`)
4. Push إلى Branch (`git push origin feature/AmazingFeature`)
5. فتح Pull Request

## 📞 الدعم

للحصول على الدعم أو الإبلاغ عن مشاكل:
- فتح Issue في GitHub
- البريد الإلكتروني: [بريدك الإلكتروني]

## 📄 الترخيص

هذا المشروع مرخص تحت رخصة MIT - انظر ملف [LICENSE](LICENSE) للتفاصيل.

## 🙏 شكر وتقدير

- [React](https://reactjs.org/) - مكتبة واجهة المستخدم
- [TypeScript](https://www.typescriptlang.org/) - JavaScript مع الأنواع
- [Vite](https://vitejs.dev/) - أداة البناء السريعة
- [docx](https://docx.js.org/) - مكتبة إنتاج ملفات Word
- [Lucide React](https://lucide.dev/) - مكتبة الأيقونات

---

**تم التطوير بـ ❤️ لخدمة الإدارة العربية الحديثة**
