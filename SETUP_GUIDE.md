# CCS Profiling System — Setup Guide
## Pamantasan ng Cabuyao · College of Computing Studies

---

## ✅ What Was Fixed

### 1. Auth / Role System (No Backend Needed!)
**Problem:** The original code relied solely on Firebase Custom Claims, which requires
the seed script to be run with Admin SDK privileges. If claims weren't set, login silently
failed with no role.

**Fix:** `AuthContext.jsx` and `firebase.services.js` now use a **two-step role lookup**:
1. First tries Firebase Custom Claims (fast, from JWT token)
2. Falls back to Firestore `users/{uid}` collection (always works after seed)

This means: **no Cloud Functions / server backend required.**

### 2. Student Data (1000 IT + CS Students)
The original had only 8 students. The new `seedFirestore.js`:
- Generates **1,000 students** programmatically (Filipino names)
- **500 BSCS** (Computer Science) + **500 BSIT** (Information Technology)
- 4 year levels × 5 sections × 25 students per section = 500 per department
- Realistic Philippine-style student IDs: `2024-0001@pnc.edu.ph`
- Randomized: scholarships, athletes, beauty candidates, officers, blood types

### 3. Dashboard Stats
`AdminService.getDashboardStats()` now only counts CS and IT students/faculty (matching
your department scope), so the numbers on the dashboard are accurate.

---

## 🚀 Quick Start

### Step 1 — Install Dependencies
```bash
npm install
```

### Step 2 — Configure Firebase
The Firebase config is already set to the CCS project:
```
Project: ccs-profiling-pnc
```
If you need to change it, edit `src/config/firebase.js`.

### Step 3 — Seed the Database (IMPORTANT — run once)

#### Get your Service Account Key:
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project → **Project Settings** → **Service Accounts**
3. Click **"Generate new private key"** → Download JSON
4. Rename it to `serviceAccountKey.json`
5. Place it in `src/config/serviceAccountKey.json`

#### Run the seed:
```bash
npm run seed
# or: node src/config/seedFirestore.js
```

**What it seeds:**
| Collection    | Count     |
|---------------|-----------|
| students      | 1,000     |
| faculty       | 24        |
| subjects      | 35        |
| schedules     | 20        |
| events        | 7         |
| departments   | 2 (CS+IT) |
| Auth accounts | 19        |

### Step 4 — Start the App
```bash
npm start
```

---

## 🔐 Login Credentials

| Role    | Email                          | Password       |
|---------|--------------------------------|----------------|
| Admin   | gbmontecillo@pnc.edu.ph        | `Admin@2024`   |
| Faculty | eamagaling@pnc.edu.ph          | `Faculty@2024` |
| Faculty | acquiatchon@pnc.edu.ph         | `Faculty@2024` |
| Faculty | madimaculangan@pnc.edu.ph      | `Faculty@2024` |
| Faculty | lmeusebio@pnc.edu.ph           | `Faculty@2024` |
| Faculty | fhablanida@pnc.edu.ph          | `Faculty@2024` |
| Student | 2024-0001@pnc.edu.ph           | `Student@2024` |
| Student | 2024-0002@pnc.edu.ph           | `Student@2024` |
| Student | 2021-0501@pnc.edu.ph           | `Student@2024` |
| Student | 2021-0502@pnc.edu.ph           | `Student@2024` |

**Other students** follow the pattern:  
Email: `{batch_year}-{padded_id}@pnc.edu.ph`  
Password: `Student@2024`  
(You can create more auth accounts in Firebase Console manually or add to AUTH_ACCOUNTS array)

---

## 📁 Project Structure

```
src/
├── config/
│   ├── firebase.js          ← Firebase SDK init (credentials)
│   └── seedFirestore.js     ← Database seed script (RUN ONCE)
├── context/
│   └── AuthContext.jsx      ← FIXED: Firestore role fallback
├── services/
│   └── firebase.services.js ← FIXED: AuthService + IT/CS filter
├── components/
│   ├── common/index.jsx     ← Shared UI components
│   └── layout/
│       ├── AppLayout.jsx    ← Protected route wrapper
│       └── Sidebar.jsx      ← Navigation sidebar
├── hooks/
│   └── useFirestore.js      ← Data fetching hooks
└── pages/
    ├── AllPages.jsx         ← All page components
    ├── Landing.jsx          ← Landing/splash page
    ├── auth/Login.jsx       ← Login page
    └── shared/Schedule.jsx  ← Schedule page (all roles)
```

---

## 🏗️ Student Data Structure

Each student document in Firestore looks like:
```json
{
  "id": "STU-0001",
  "firstName": "Bianca",
  "lastName": "Lim",
  "middleName": "Gonzalez",
  "deptId": "CS",
  "course": "BSCS",
  "yearLevel": 1,
  "section": "1CS-A",
  "studentId": "2024-0001",
  "email": "2024-0001@pnc.edu.ph",
  "birthday": "2004-08-08",
  "gender": "Female",
  "bloodType": "AB-",
  "scholarship": "None",
  "isOfficer": false,
  "isAthlete": true,
  "isBeautyCandidate": false,
  "guardian": "Patricia Lim",
  "guardianContact": "0917-101-0007",
  "status": "active"
}
```

---

## 🗂️ Sections Layout

| Dept | Year | Sections               | Students |
|------|------|------------------------|----------|
| CS   | 1    | 1CS-A to 1CS-E         | 125      |
| CS   | 2    | 2CS-A to 2CS-E         | 125      |
| CS   | 3    | 3CS-A to 3CS-E         | 125      |
| CS   | 4    | 4CS-A to 4CS-E         | 125      |
| IT   | 1    | 1IT-A to 1IT-E         | 125      |
| IT   | 2    | 2IT-A to 2IT-E         | 125      |
| IT   | 3    | 3IT-A to 3IT-E         | 125      |
| IT   | 4    | 4IT-A to 4IT-E         | 125      |
| **TOTAL** |    |                   | **1,000** |

---

## ⚠️ Important Notes

1. **`serviceAccountKey.json`** is in `.gitignore` — never commit it to GitHub!
2. Run the seed script only **once**. Running again will skip existing accounts and re-set claims.
3. The seed batches Firestore writes (400 per batch) to avoid quota limits.
4. To deploy to Vercel, run `npm run build` and upload the `build/` folder.

---

## 🔥 Firebase Firestore Rules

The included `firestore.rules` already handles:
- Authenticated reads for students/faculty by role
- Admin can write everything
- Faculty can update grades, modules
- Students can read their own data only

