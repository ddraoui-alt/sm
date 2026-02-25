# 🎓 Student Management Application - Complete Setup Guide

## 🎯 Project Overview

**Gestion des Étudiants** is a complete full-stack student management application built with:
- **Frontend**: Next.js 16 + React 19
- **Backend**: Next.js API Routes
- **Database**: SQLite
- **Authentication**: NextAuth.js with JWT
- **Deployment**: Vercel-ready configuration

**Location**: `C:\Users\HP\Desktop\student-app`
**Git Repository**: `https://github.com/ddraoui-alt/sm.git`

---

## ✅ What's Included

### 📁 Application Features
- ✅ User authentication (register/login)
- ✅ Student CRUD operations (Create, Read, Update, Delete)
- ✅ Responsive design (mobile-friendly)
- ✅ Protected routes (authentication required)
- ✅ RESTful API
- ✅ SQLite database with proper schema
- ✅ Form validation
- ✅ Error handling

### 📄 Documentation Files
| File | Purpose |
|------|---------|
| `README.md` | Main project documentation |
| `DEPLOYMENT_GUIDE.md` | How to deploy to Vercel |
| `DEVELOPMENT.md` | Development guidelines |
| `PROJECT_SUMMARY.txt` | Detailed project summary |
| `.env.example` | Environment variables template |

### 🔧 Setup Scripts
| Script | OS | Purpose |
|--------|----|----|
| `setup.bat` | Windows | Automated setup |
| `setup.sh` | Linux/Mac | Automated setup |

---

## 🚀 Getting Started (5 minutes)

### Method 1: Automated Setup (Recommended)

**Windows**:
```bash
# Double-click setup.bat OR run in terminal
setup.bat
```

**Linux/Mac**:
```bash
# Make script executable
chmod +x setup.sh

# Run setup
./setup.sh
```

### Method 2: Manual Setup

1. **Install dependencies**:
```bash
npm install
```

2. **Setup environment**:
```bash
# Copy .env.example to .env.local
cp .env.example .env.local

# OR on Windows PowerShell
Copy-Item .env.example .env.local
```

3. **Create data directory**:
```bash
mkdir data
```

4. **Start development server**:
```bash
npm run dev
```

5. **Open in browser**:
```
http://localhost:3000
```

---

## 📝 First Time Steps

### 1. Register Account
1. Click "Inscription" in top right
2. Enter email and password
3. Click "S'inscrire"
4. You'll be redirected to login

### 2. Login
1. Enter your email and password
2. Click "Se connecter"
3. You're now authenticated!

### 3. Add Your First Student
1. Click "Étudiants" in navigation
2. Click "➕ Ajouter un étudiant"
3. Fill in student details:
   - **Matricule**: STU001
   - **Nom**: Dupont
   - **Prénom**: Jean
   - **Filière**: Informatique
   - **Niveau**: L2
4. Click "Ajouter l'étudiant"

### 4. Manage Students
- **View**: All students appear in table
- **Edit**: Click ✏️ button to modify
- **Delete**: Click 🗑️ button to remove

---

## 🎮 Application Routes

### Public Routes
```
/                 → Home page
/auth/login       → Login page
/auth/register    → Registration page
```

### Protected Routes (Requires Login)
```
/students         → List all students
/students/add     → Add new student
/students/[id]    → Edit student
```

### API Routes
```
GET    /api/students         → Get all students
POST   /api/students         → Create student
GET    /api/students/[id]    → Get one student
PUT    /api/students/[id]    → Update student
DELETE /api/students/[id]    → Delete student

POST   /api/auth/register    → Register user
```

---

## 🛠️ Available Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint

# View help
npm help
```

---

## 📊 Database Explained

### Database Location
- **Development**: `./data/students.db`
- **Production**: Configure in environment variables

### Database Tables

**users** (Authentication)
```sql
id          | INTEGER PRIMARY KEY
email       | TEXT UNIQUE NOT NULL
password    | TEXT NOT NULL (hashed)
name        | TEXT
created_at  | DATETIME
```

**students** (Student Information)
```sql
id              | INTEGER PRIMARY KEY
matricule       | TEXT UNIQUE NOT NULL
nom             | TEXT NOT NULL
prenom          | TEXT NOT NULL
email           | TEXT
telephone       | TEXT
date_naissance  | DATE
adresse         | TEXT
filiere         | TEXT
niveau          | TEXT (L1-M2)
statut          | TEXT (actif/inactif/suspendu)
created_at      | DATETIME
updated_at      | DATETIME
```

**grades** (Optional - For future use)
```sql
id         | INTEGER PRIMARY KEY
student_id | INTEGER FK → students
subject    | TEXT
grade      | REAL
date_exam  | DATE
```

---

## 🔐 Security Features

✅ **Password Security**
- Hashed with bcryptjs (10 rounds)
- Never stored in plain text
- Never transmitted over HTTP

✅ **Session Security**
- JWT-based sessions
- HTTPS recommended
- CSRF protection via NextAuth

✅ **API Security**
- All endpoints require authentication
- Input validation on all forms
- SQL injection protection (parameterized queries)

✅ **Environment Security**
- Secrets in `.env.local` (not in Git)
- NEXTAUTH_SECRET must be changed in production
- Database passwords never in code

---

## 🌐 Deployment (Vercel)

### Quick Deploy

1. **Prepare for deployment**:
```bash
# Generate secure secret
# (32+ random characters)
node -e "console.log(require('crypto').randomBytes(16).toString('hex'))"

# Update .env.local for Vercel
NEXTAUTH_SECRET=your-generated-secret
NEXTAUTH_URL=https://your-app.vercel.app
```

2. **Push to GitHub**:
```bash
git add .
git commit -m "Final version"
git push -u origin main
```

3. **Deploy to Vercel**:
- Go to https://vercel.com/new
- Connect GitHub repository
- Set environment variables
- Click "Deploy"

### Full Deployment Guide
See `DEPLOYMENT_GUIDE.md` for detailed instructions

---

## 🐛 Troubleshooting

### "Port 3000 already in use"
```bash
# Find what's using port 3000
lsof -i :3000

# Or on Windows
netstat -ano | findstr :3000

# Kill the process
kill -9 <PID>
```

### "Database not found"
```bash
# Create data directory
mkdir data

# Database will auto-create on first access
npm run dev
```

### "Module not found"
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json

# Or on Windows
rmdir /s node_modules
del package-lock.json

# Reinstall
npm install
```

### "Authentication not working"
1. Check `NEXTAUTH_SECRET` is set (not empty)
2. Check `NEXTAUTH_URL` matches your domain
3. Verify `.env.local` exists and is readable
4. Restart dev server

---

## 📚 Documentation Links

- 📖 [README.md](README.md) - Full project documentation
- 🚀 [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) - Deployment instructions
- 🛠️ [DEVELOPMENT.md](DEVELOPMENT.md) - Development guide
- 📋 [PROJECT_SUMMARY.txt](PROJECT_SUMMARY.txt) - Detailed summary

---

## 🎓 Learning Resources

### Next.js
- https://nextjs.org/docs

### React
- https://react.dev

### NextAuth.js
- https://next-auth.js.org

### SQLite
- https://www.sqlite.org/lang.html

---

## 💡 Feature Ideas

Consider adding:
- 📊 Grade management system
- 📈 Analytics dashboard
- 🔔 Notification system
- 📄 PDF report generation
- 👥 Multi-role support (Admin, Teacher, Student)
- 🔐 Two-factor authentication
- 📸 Student photos
- 📋 Attendance tracking

---

## 🤝 Project File Summary

```
student-app/                          (Root directory)
├── app/                              (Application code)
│   ├── api/                          (API routes)
│   │   ├── auth/                     (Authentication)
│   │   │   ├── [...nextauth]/        (NextAuth core)
│   │   │   └── register/             (User registration)
│   │   └── students/                 (Student endpoints)
│   │       ├── route.js              (List & Create)
│   │       └── [id]/route.js         (Get, Update, Delete)
│   ├── auth/                         (Auth pages)
│   │   ├── login/page.js             (Login form)
│   │   └── register/page.js          (Signup form)
│   ├── students/                     (Student pages)
│   │   ├── page.js                   (List view)
│   │   ├── add/page.js               (Add form)
│   │   └── [id]/page.js              (Edit form)
│   ├── components/                   (Components)
│   │   └── Header.js                 (Navigation)
│   ├── lib/                          (Utilities)
│   │   └── db.js                     (Database)
│   ├── layout.js                     (Root layout)
│   ├── page.js                       (Home page)
│   ├── globals.css                   (Styles)
│   └── providers.js                  (SessionProvider)
├── node_modules/                     (Dependencies - auto-generated)
├── public/                           (Static files)
├── .git/                             (Git repository)
├── .env.example                      (Environment template)
├── .env.local                        (Local config - secret)
├── .gitignore                        (Git ignore)
├── next.config.js                    (Next.js config)
├── jsconfig.json                     (JS config)
├── vercel.json                       (Vercel config)
├── package.json                      (Dependencies)
├── package-lock.json                 (Lockfile)
├── README.md                         (Main docs)
├── DEPLOYMENT_GUIDE.md               (Deploy docs)
├── DEVELOPMENT.md                    (Dev guide)
├── PROJECT_SUMMARY.txt               (Summary)
├── setup.bat                         (Windows setup)
└── setup.sh                          (Linux/Mac setup)
```

---

## 🎉 You're All Set!

Your complete student management application is ready to use!

### Next Steps:
1. ✅ Run `npm run dev`
2. ✅ Open http://localhost:3000
3. ✅ Create an account
4. ✅ Add students
5. ✅ Deploy to Vercel

### Need Help?
- Check the documentation files
- Review DEPLOYMENT_GUIDE.md for production setup
- See DEVELOPMENT.md for code questions

---

**Version**: 1.0.0  
**Status**: ✅ Production Ready  
**Last Updated**: February 2026

Good luck with your student management application! 🚀
