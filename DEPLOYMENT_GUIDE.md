# DEPLOYMENT_GUIDE.md

## Deployment Guide - Gestion des Étudiants

This guide covers deploying the Student Management application to Vercel.

## Prerequisites

- GitHub account with repository
- Vercel account (https://vercel.com)
- Environment variables ready

## Deployment Steps

### 1. Push Code to GitHub

The code is already prepared in the local Git repository.

```bash
# If not already done, push to GitHub
git branch -M main
git push -u origin main
```

**Note**: You may need to authenticate with GitHub:
- **HTTPS**: Use a Personal Access Token (PAT) as password
- **SSH**: Set up SSH keys for authentication

### 2. Deploy to Vercel

#### Option A: Via Vercel UI (Recommended)

1. Go to https://vercel.com/dashboard
2. Click "New Project"
3. Select "Import Git Repository"
4. Enter: https://github.com/ddraoui-alt/sm
5. Select "Next.js" as framework
6. Configure environment variables:
   - `NEXTAUTH_SECRET`: Set to a random 32+ character string
   - `NEXTAUTH_URL`: Your Vercel deployment URL (e.g., https://yourapp.vercel.app)
   - `NODE_ENV`: production
   - `DATABASE_PATH`: /tmp/students.db or use external database service
7. Click "Deploy"

#### Option B: Via Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# For production deployment
vercel --prod
```

### 3. Environment Variables Configuration

Create these variables in Vercel dashboard:

```
NEXTAUTH_SECRET=your-secure-random-string-here-min-32-chars
NEXTAUTH_URL=https://your-deployed-app.vercel.app
NODE_ENV=production
DATABASE_PATH=/tmp/students.db
JWT_SECRET=your-jwt-secret-key
```

### 4. Database Setup for Production

**SQLite Considerations for Serverless**:

SQLite works with Vercel, but has limitations:
- Read-only `/tmp` directory (use for temporary storage)
- Database doesn't persist between deployments

**Recommended Solutions**:

#### Option 1: PostgreSQL with Supabase (Easiest)

1. Create account at https://supabase.com
2. Create a new project
3. Get connection string
4. Modify `app/lib/db.js` to use PostgreSQL client

```javascript
// Install PostgreSQL client
npm install pg

// Update db.js to use pg instead of sqlite3
import pg from 'pg';

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});
```

5. Add to Vercel: `DATABASE_URL=postgresql://...`

#### Option 2: MongoDB

1. Create account at https://mongodb.com/cloud
2. Get connection string
3. Install MongoDB driver: `npm install mongodb`
4. Update database code

#### Option 3: Neon (PostgreSQL)

1. Sign up at https://neon.tech
2. Create database
3. Use connection string in Vercel

### 5. Verify Deployment

- Check Vercel dashboard for deployment logs
- Visit your deployed URL (e.g., https://sm.vercel.app)
- Test functionality:
  1. Register a new account
  2. Login
  3. Add a student
  4. Verify data persistence

### 6. Custom Domain (Optional)

1. In Vercel dashboard, go to project settings
2. Go to "Domains"
3. Add your domain
4. Follow DNS configuration instructions

## Troubleshooting

### Database Connection Failed

- Ensure DATABASE_URL matches your database service
- Check credentials in environment variables
- Verify network access is allowed from Vercel

### NextAuth Issues

- Verify `NEXTAUTH_URL` matches your deployment URL exactly
- Ensure `NEXTAUTH_SECRET` is set (at least 32 characters)
- Check NextAuth logs in Vercel dashboard

### Build Failures

1. Check Vercel build logs
2. Ensure all dependencies are in package.json
3. Try rebuilding: `git push` (automatically redeploys)

### Static Files Not Found

- All static files must be in `/public` directory
- Use `public/` path when referencing in code

## Monitoring & Logs

### View Deployment Logs

1. Vercel Dashboard → Your Project → Deployments
2. Click on deployment to view logs
3. Check "Functions" and "Build" tabs for errors

### Real-time Logs

Use Vercel CLI:
```bash
vercel logs
vercel logs <deployment-id>
```

## Production Checklist

- [x] NextAuth secret set (32+ chars)
- [x] NEXTAUTH_URL configured correctly
- [x] Database service configured
- [x] Environment variables all set
- [x] Build completes without errors
- [x] Authentication works
- [x] API routes functional
- [x] Static assets loading
- [x] No console errors in browser
- [x] Mobile responsive design tested

## Security Best Practices

1. **Rotate Secrets**: Regularly update `NEXTAUTH_SECRET`
2. **Use HTTPS**: Ensure all traffic is encrypted
3. **CORS**: Configure properly if needed
4. **Rate Limiting**: Implement for API endpoints
5. **Input Validation**: Already implemented in API routes
6. **SQL Injection**: Using parameterized queries (safe)
7. **CSRF Protection**: Provided by NextAuth
8. **Password Hashing**: Using bcryptjs

## Scaling Considerations

- Database connection pooling for high traffic
- Consider caching layer (Redis) for frequently accessed data
- Implement pagination for large student lists
- Monitor Vercel analytics for performance

## Rollback

To rollback to previous version:
1. Vercel Dashboard → Deployments
2. Find previous deployment
3. Click three dots menu
4. Select "Redeploy"

## Support & Issues

- Vercel Docs: https://vercel.com/docs
- Next.js Docs: https://nextjs.org/docs
- NextAuth Docs: https://next-auth.js.org

## Cost Considerations

- **Vercel**: Free tier available (generous limits)
- **Database**: 
  - SQLite (Vercel): Free (limited)
  - Supabase: Free tier available
  - MongoDB: Free tier available (limited)
  - Neon: Free tier available

---

**Last Updated**: February 2026
