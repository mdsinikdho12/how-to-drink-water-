# 💧 পানি পান মাস্টারক্লাস

বাংলাদেশের প্রথম পানি পান কোর্স — ইসলামিক শরিয়াহ ও বৈজ্ঞানিক পদ্ধতিতে।

## 🚀 প্রজেক্ট সেটআপ

### ১. ডিপেন্ডেন্সি ইনস্টল

```bash
npm install
```

### ২. Environment Variables সেটআপ

`.env.local` ফাইলে নিচের ভ্যারিয়েবল যোগ করুন:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/pani-course?retryWrites=true&w=majority
NEXTAUTH_SECRET=pani-course-secret-change-this-2024
NEXTAUTH_URL=http://localhost:3000
```

> **MongoDB URI পেতে:** [MongoDB Atlas](https://cloud.mongodb.com) এ যান → Free cluster তৈরি করুন → Connect → Connection String কপি করুন।

### ৩. ডেভেলপমেন্ট সার্ভার চালু করুন

```bash
npm run dev
```

ব্রাউজারে খুলুন: [http://localhost:3000](http://localhost:3000)

### ৪. প্রোডাকশন বিল্ড

```bash
npm run build
npm start
```

---

## 📁 প্রজেক্ট স্ট্রাকচার

```
src/
├── app/
│   ├── page.tsx              # হোম পেজ
│   ├── login/page.tsx        # লগইন পেজ
│   ├── register/page.tsx     # রেজিস্ট্রেশন পেজ
│   ├── courses/
│   │   ├── page.tsx          # সব কোর্স
│   │   └── [id]/page.tsx     # কোর্স ডিটেইল
│   ├── dashboard/
│   │   ├── page.tsx          # ড্যাশবোর্ড
│   │   ├── profile/page.tsx  # প্রোফাইল
│   │   ├── course/[id]/page.tsx  # কোর্স লার্নিং
│   │   └── certificate/[id]/page.tsx  # সার্টিফিকেট
│   └── api/
│       ├── auth/[...nextauth]/route.ts
│       ├── users/
│       │   ├── register/route.ts
│       │   └── profile/route.ts
│       └── courses/
│           ├── route.ts
│           └── [id]/
│               ├── route.ts
│               └── progress/route.ts
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   └── course/
│       ├── EnrollButton.tsx
│       └── CourseLearningClient.tsx
├── lib/
│   ├── mongodb.ts     # DB সংযোগ
│   ├── auth.ts        # NextAuth config
│   └── courseData.ts  # কোর্স ডেটা (auto-seed)
└── models/
    ├── User.ts
    ├── Course.ts
    └── Progress.ts
```

---

## ✨ ফিচারসমূহ

- ✅ **ইউজার রেজিস্ট্রেশন ও লগইন** (NextAuth + JWT)
- ✅ **MongoDB** ডেটা স্টোরেজ
- ✅ **কোর্স এনরোলমেন্ট** সিস্টেম
- ✅ **লেসন প্রোগ্রেস ট্র্যাকিং**
- ✅ **সুন্দর ড্যাশবোর্ড**
- ✅ **ইন্টারেক্টিভ কোর্স লার্নিং UI**
- ✅ **সার্টিফিকেট** পেজ
- ✅ **Hind Siliguri ফন্ট** (বাংলা)
- ✅ **সম্পূর্ণ রেসপন্সিভ** ডিজাইন
- ✅ **Auto-seed** কোর্স ডেটা

---

## 🛠 টেক স্ট্যাক

| টেকনোলজি | ব্যবহার |
|-----------|---------|
| **Next.js 14** | ফ্রেমওয়ার্ক (App Router) |
| **TypeScript** | টাইপ সেফটি |
| **MongoDB + Mongoose** | ডেটাবেজ |
| **NextAuth.js** | অথেন্টিকেশন |
| **Tailwind CSS** | স্টাইলিং |
| **Lucide React** | আইকন |
| **bcryptjs** | পাসওয়ার্ড হ্যাশিং |

---

## 📱 পেজসমূহ

| পেজ | URL | বিবরণ |
|-----|-----|-------|
| হোম | `/` | ল্যান্ডিং পেজ |
| লগইন | `/login` | ইউজার লগইন |
| রেজিস্ট্রেশন | `/register` | নতুন একাউন্ট |
| কোর্সসমূহ | `/courses` | সব কোর্স তালিকা |
| কোর্স ডিটেইল | `/courses/:id` | একটি কোর্সের বিবরণ |
| ড্যাশবোর্ড | `/dashboard` | ইউজার ড্যাশবোর্ড |
| প্রোফাইল | `/dashboard/profile` | ইউজার প্রোফাইল |
| কোর্স শিক্ষা | `/dashboard/course/:id` | কোর্স পড়া |
| সার্টিফিকেট | `/dashboard/certificate/:id` | সার্টিফিকেট |

---

## 🔐 API Routes

```
POST /api/users/register          - নতুন ইউজার তৈরি
GET  /api/users/profile           - প্রোফাইল দেখুন
PUT  /api/users/profile           - প্রোফাইল আপডেট
GET  /api/courses                 - সব কোর্স
GET  /api/courses/:id             - একটি কোর্স
POST /api/courses/:id             - কোর্সে এনরোল
GET  /api/courses/:id/progress    - প্রোগ্রেস দেখুন
PUT  /api/courses/:id/progress    - প্রোগ্রেস আপডেট
```

---

**তৈরি করা হয়েছে Next.js 14, MongoDB এবং ❤️ দিয়ে**
