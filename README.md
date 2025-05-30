# 3-oy Imtihon

Bu loyiha **Najot Ta'lim 3-oy imtihoni** uchun yaratilgan bo‘lib, Express.js, MongoDB va JWT asosida **xavfsiz va rollarga bo‘lingan** REST API serverdir.

## 🧩 Texnologiyalar

- **Node.js** – server muhit
- **Express.js** – backend framework
- **MongoDB + Mongoose** – ma’lumotlar bazasi
- **JWT** – token asosida autentifikatsiya
- **bcrypt** – parollarni xavfsiz saqlash
- **Joi** – so‘rovlarni validatsiya qilish
- **Multer** – rasm yuklash
- **Render.com** – deploy uchun

---

## ⚙️ O‘rnatish

```bash
git clone https://github.com/Bobur815/3-oy-imtihon.git
cd 3-oy-imtihon
npm install

🔐 Muhit sozlamalari (.env)
Quyidagilarni .env faylga yozing:
PORT=5000
MONGO_URL=mongodb://localhost:27017/3-oy-imtihon
JWT_SECRET_KEY=your_secret_key
JWT_ACCESS_EXPIRE=24h

🚀 Ishga tushirish
npm run dev


📌 API Yo'nalishlar

| Yo'nalish         | Tavsif                                       |
| ----------------- | -------------------------------------------- |
| `/api/staff`      | Hodimlar CRUD, login, ro‘yxatdan o‘tish      |
| `/api/branch`     | Filiallarni boshqarish                       |
| `/api/transport`  | Transportlarni qo‘shish, o‘zgartirish        |
| `/api/permission` | Har bir hodimning huquqlarini nazorat qilish |


🛡 Xavfsizlik va Rollar
🔑 Token
Har bir foydalanuvchi login bo‘lgach, unga JWT token beriladi.

Token orqali har bir so‘rovni autentifikatsiya qilish mumkin.

Middleware orqali token req.user ga joylanadi.

🧑‍💻 Rollar
SuperAdmin – barcha huquqlarga ega (va faqat bitta bo‘lishi mumkin)

admin – faqat o‘z filialiga tegishli hodimlarni boshqaradi

staff – faqat o‘zini ko‘radi, parolini o‘zgartiradi

✅ Permission Xususiyatlari
permissionModel: 'staff', 'transport', 'branch', 'permission'

Har bir model uchun quyidagi huquqlar bo‘lishi mumkin:

- read

- write

- update

- delete

📌 Avtomatik Permissionlar:
Yangi staff yaratilganda, unga staff model uchun read va update huquqi avtomatik qo‘shiladi.

admin bo‘lsa, unga staff va transport permissionlari to‘liq (CRUD) qilib avtomatik beriladi.

SuperAdmin huquqlari tekshirilmaydi — unga hamma narsa ochiq.

🖼 Rasm Yuklash
Transportga rasm qo‘shilsa src/uploads/ papkasiga saqlanadi.

Rasm o‘zgartirilganda eski fayl avtomatik o‘chiriladi.

📂 Papkalar tuzilmasi

├── src/
│   ├── controller/       # Business logika
│   ├── middleware/       # Token, Permission va Error handler
│   ├── models/           # Mongoose model fayllari
│   ├── routes/           # API yo‘nalishlari
│   ├── services/         # Token, permission xizmatlari
│   ├── uploads/          # Yuklangan rasm fayllari

👨‍💻 Muallif
Boburmirzo Ergashev
📫 GitHub profilim

⭐ Agar loyiha sizga yoqqan bo‘lsa, yulduzcha bosib qo‘ying!

