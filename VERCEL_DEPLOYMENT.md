# Vercel Deployment Guide

## Project Ready for Deployment ✅

This Next.js student management application is now configured and ready for deployment on Vercel.

## Prerequisites

1. **GitHub Repository**: The code is already pushed to [https://github.com/ddraoui-alt/sm.git](https://github.com/ddraoui-alt/sm.git)
2. **Vercel Account**: Create a free account at [https://vercel.com](https://vercel.com)
3. **Environment Variables**: Required for production

## Step-by-Step Deployment

### 1. Connect Repository to Vercel
- Go to [https://vercel.com](https://vercel.com) and sign in
- Click "Import Project"
- Select "Import Git Repository"
- Enter: `https://github.com/ddraoui-alt/sm.git`
- Click "Continue"

### 2. Configure Project Settings
- **Project Name**: `student-app` (or your preferred name)
- **Framework**: Next.js (auto-detected)
- **Root Directory**: `.` (current directory)

### 3. Set Environment Variables
Before deploying, configure these environment variables in Vercel:

| Variable | Value | Notes |
|----------|-------|-------|
| `NEXTAUTH_SECRET` | Generate a random string | Use: `openssl rand -base64 32` or online generator |
| `NEXTAUTH_URL` | `https://your-app.vercel.app` | Replace with your actual Vercel domain |
| `NODE_ENV` | `production` | Required for production |
| `DATABASE_PATH` | `./data/students.db` | Works with SQLite in Vercel's /tmp directory |
| `JWT_SECRET` | Generate a random string | Similar to NEXTAUTH_SECRET |

**⚠️ IMPORTANT**: Generate secure random strings for `NEXTAUTH_SECRET` and `JWT_SECRET`:
```bash
# Using OpenSSL (Linux/Mac)
openssl rand -base64 32

# Using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

### 4. Deploy
- Click "Deploy"
- Wait for the build process to complete (usually 2-3 minutes)
- Your app will be live at `https://your-app.vercel.app`

## Important Notes

### Database
- The application uses SQLite with a local database file at `./data/students.db`
- On Vercel, this database file will be in the `/tmp` directory
- **For production use**, consider migrating to a cloud database:
  - PostgreSQL (recommended for production)
  - MongoDB
  - Prisma with cloud databases

### Authentication
- NextAuth.js is configured with Credentials Provider
- Default credentials can be set in the database during initialization
- Users must authenticate to access student management features

### Session Management
- JWT-based sessions with 30-day expiration
- Secure cookies for session storage

### Features
✅ Student CRUD Operations (Create, Read, Update, Delete)
✅ User Authentication with NextAuth.js
✅ Role-based access (authenticated users only)
✅ Responsive design
✅ Protected API routes

## Testing Deployment

After deployment:

1. **Test Authentication**
   - Navigate to `/auth/login`
   - Log in with your credentials
   - Verify session works

2. **Test CRUD Operations**
   - View students list at `/students`
   - Add a new student at `/students/add`
   - Edit and delete students as needed

3. **Test API Endpoints**
   - GET `/api/students` - List all students
   - POST `/api/students` - Create student
   - GET `/api/students/[id]` - Get student details
   - PATCH `/api/students/[id]` - Update student
   - DELETE `/api/students/[id]` - Delete student

## Troubleshooting

### Build Fails
- Check environment variables are set correctly
- Verify Node version is 18+ (Vercel default: 20.x)
- Check build logs in Vercel dashboard

### Database Issues
- Ensure `./data/students.db` exists in repository
- For production, migrate to cloud database

### Authentication Issues
- Verify `NEXTAUTH_SECRET` is set and secure
- Ensure `NEXTAUTH_URL` matches your Vercel domain
- Check NextAuth logs in Vercel dashboard

### Cold Start Issues
- First request after deployment may take longer
- Vercel automatically optimizes after first use

## Next Steps

1. Set up automated deployments
   - Every push to `master` branch automatically deploys
2. Monitor application performance
   - Use Vercel Analytics dashboard
3. Set up custom domain (optional)
   - Connect your domain in Vercel settings
4. Configure production database
   - Migrate from SQLite to PostgreSQL/MongoDB

## Support

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [NextAuth.js Documentation](https://next-auth.js.org)

---

**Status**: ✅ Application is production-ready for Vercel deployment
**Repository**: [https://github.com/ddraoui-alt/sm.git](https://github.com/ddraoui-alt/sm.git)
**Built with**: Next.js 16.1.6 | Node.js 24.14.0 | Turbopack
