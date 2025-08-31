# إعدادات نموذج التواصل - MasarFlow

## 📋 الملخص
تم إعداد نموذج التواصل لإرسال البيانات إلى Activepieces باستخدام Netlify Proxy.

## ⚙️ التكوين الحالي

### 1. ملف `netlify.toml`
```toml
[[redirects]]
  from = "/api/contact"
  to = "https://cloud.activepieces.com/api/v1/webhooks/O4RKo8kmQwsTORFYUZzm9"
  status = 200
  force = true
```

### 2. Frontend (React)
- **الملف:** `src/utils/webhookService.ts`
- **المسار:** `/api/contact`
- **الطريقة:** POST
- **نوع المحتوى:** application/json

## 🔄 كيف يعمل النظام

1. **المستخدم** يملأ النموذج في الموقع
2. **JavaScript** يرسل البيانات إلى `/api/contact`
3. **Netlify** يعيد توجيه الطلب إلى Activepieces
4. **Activepieces** يستقبل البيانات ويعالجها

## 🧪 الاختبار

### الاختبار المحلي
```bash
# افتح الملف في المتصفح
test-webhook.html
```

### الاختبار على الإنتاج
1. انشر الموقع على Netlify
2. اذهب إلى صفحة "اتصل بنا"
3. املأ النموذج واضغط "إرسال"
4. تحقق من وصول البيانات إلى Activepieces

## 🔍 استكشاف الأخطاء

### إذا لم تصل البيانات:

1. **تحقق من وحدة تحكم المطور:**
   ```javascript
   // افتح Developer Tools (F12)
   // اذهب إلى تبويب Console
   // ابحث عن رسائل تبدأ بـ 📤 أو ❌
   ```

2. **تحقق من تبويب Network:**
   - ابحث عن طلب إلى `/api/contact`
   - تأكد من الحالة 200
   - تحقق من Response Headers

3. **تحقق من إعدادات Netlify:**
   - تأكد من نشر ملف `netlify.toml`
   - تحقق من Netlify Dashboard > Site Settings > Build & Deploy

4. **تحقق من Activepieces:**
   - تأكد من صحة رابط الويب هوك
   - تحقق من إعدادات الأمان

## 📝 ملاحظات مهمة

- **الأمان:** البيانات تمر عبر HTTPS فقط
- **Cors:** تم إعداد headers بشكل صحيح
- **التوافق:** يعمل مع جميع المتصفحات الحديثة
- **المراقبة:** جميع العمليات تُسجل في console للمطورين

## 🔧 إعدادات إضافية

### Headers الأمان
```toml
headers = {X-Frame-Options = "DENY", X-XSS-Protection = "1; mode=block"}
```

### User Agent
```javascript
'User-Agent': 'MasarFlow-ContactForm/1.0'
```

---
**آخر تحديث:** ${new Date().toLocaleDateString('ar-SA')}
**المطور:** فريق MasarFlow التقني
