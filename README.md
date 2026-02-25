# 📚 Gestion des Étudiants - Student Management Application

A comprehensive full-stack student management application built with Next.js, SQLite, and NextAuth for authentication.

## Features

- ✅ **User Authentication**: Secure login and registration with NextAuth
- ✅ **Student Management**: Add, edit, view, and delete student records
- ✅ **Database**: SQLite for data persistence
- ✅ **API Routes**: RESTful API for student operations
- ✅ **Responsive Design**: Mobile-friendly interface
- ✅ **Protected Routes**: Secure pages with authentication
- ✅ **Vercel Ready**: Configured for deployment on Vercel

## Tech Stack

- **Frontend**: Next.js 14, React 18, JavaScript
- **Backend**: Next.js API Routes
- **Database**: SQLite
- **Authentication**: NextAuth.js
- **Styling**: CSS3
- **Deployment**: Vercel

## Installation

### Prerequisites

- Node.js 16+ and npm

### Setup

1. Clone or download the project:
```bash
git clone https://github.com/ddraoui-alt/sm.git
cd student-management-app
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Edit `.env.local` and add your configuration:
```
NEXTAUTH_SECRET=your-random-secret-key
NEXTAUTH_URL=http://localhost:3000
NODE_ENV=development
DATABASE_PATH=./data/students.db
```

## Development

Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Default Login

The application uses NextAuth with email/password authentication. Register a new account at `/auth/register` or use demo credentials after creating an account.

## Project Structure

```
student-app/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── [...nextauth]/
│   │   │   ├── register/
│   │   │   └── login/
│   │   └── students/
│   │       ├── route.js (GET, POST)
│   │       └── [id]/route.js (GET, PUT, DELETE)
│   ├── auth/
│   │   ├── login/page.js
│   │   └── register/page.js
│   ├── students/
│   │   ├── page.js (Student list)
│   │   ├── add/page.js (Add student)
│   │   └── [id]/page.js (Edit student)
│   ├── components/
│   │   └── Header.js
│   ├── lib/
│   │   └── db.js (Database connection)
│   ├── layout.js
│   ├── page.js (Home page)
│   ├── globals.css
│   └── providers.js (NextAuth Provider)
├── public/
├── .env.local
├── .env.example
├── next.config.js
├── jsconfig.json
├── vercel.json
├── package.json
└── .gitignore
```

## Database Schema

### Users Table
```sql
- id: PRIMARY KEY
- email: UNIQUE
- password: HASHED
- name: TEXT
- created_at: TIMESTAMP
```

### Students Table
```sql
- id: PRIMARY KEY
- matricule: UNIQUE
- nom: TEXT (Last Name)
- prenom: TEXT (First Name)
- email: TEXT
- telephone: TEXT
- date_naissance: DATE
- adresse: TEXT
- filiere: TEXT (Major/Program)
- niveau: TEXT (Level: L1, L2, L3, M1, M2)
- statut: TEXT (Status: actif, inactif, suspendu)
- date_inscription: TIMESTAMP
- created_at: TIMESTAMP
- updated_at: TIMESTAMP
```

### Grades Table
```sql
- id: PRIMARY KEY
- student_id: FOREIGN KEY
- subject: TEXT
- grade: REAL
- date_exam: DATE
- created_at: TIMESTAMP
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/[...nextauth]` - NextAuth authentication

### Students
- `GET /api/students` - Get all students
- `POST /api/students` - Add new student
- `GET /api/students/[id]` - Get student by ID
- `PUT /api/students/[id]` - Update student
- `DELETE /api/students/[id]` - Delete student

## Building for Production

Build the application:
```bash
npm run build
```

Start the production server:
```bash
npm start
```

## Deployment on Vercel

This project is pre-configured for Vercel deployment.

1. Push your code to GitHub
2. Connect your GitHub repository to Vercel
3. Set environment variables in Vercel dashboard:
   - `NEXTAUTH_SECRET`
   - `NEXTAUTH_URL` (your Vercel app URL)
   - `NODE_ENV=production`
   - `DATABASE_PATH` (use a persistent storage solution)

4. Deploy with a single click

### Database for Production

For Vercel deployment, consider using:
- **PostgreSQL** with Supabase
- **MongoDB** with MongoDB Atlas
- **Neon** for serverless PostgreSQL
- Or continue with SQLite using Vercel's edge storage

## Features to Implement

- 📊 Grade management system
- 📈 Student performance analytics
- 🔔 Notification system
- 📄 Report generation
- 👥 Multi-role user system (Admin, Teacher, Student)
- 🔐 Two-factor authentication

## Troubleshooting

### Database not found
Make sure the `data/` directory exists and is writable.

### Authentication issues
Check that `NEXTAUTH_SECRET` is set and `NEXTAUTH_URL` matches your deployment URL.

### API errors
Check browser console and server logs for detailed error messages.

## License

ISC License - Feel free to use this project for personal or commercial use.

## Support

For issues or questions, please open an issue on GitHub: https://github.com/ddraoui-alt/sm/issues

## Author

Created with ❤️ for educational and practical student management.

---

**Version**: 1.0.0  
**Last Updated**: February 2026
