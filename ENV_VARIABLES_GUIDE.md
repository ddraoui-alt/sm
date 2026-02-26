# Environment Variables Configuration Guide

## Where Environment Variables Are Defined

### 1. **[.env.local](.env.local)** - Development Environment
This file contains your LOCAL development secrets. **Never commit this to Git** (it's in .gitignore).

```dotenv
NEXTAUTH_SECRET=amxVQiTnqibWe4qeJ6J3xImVnKk4OiSVBuoXdVuZn/c=
NEXTAUTH_URL=http://localhost:3000
NODE_ENV=development
DATABASE_PATH=./data/students.db
JWT_SECRET=v/YTUHdmavn3Jkd5APkIcZ8nnUlkEYU7NMwPZeeLD9E=
```

### 2. **[.env.example](.env.example)** - Template Reference
This is a template file showing what environment variables are needed. Share this with your team, but keep actual secrets in `.env.local`.

```dotenv
# Copy and customize these values in .env.local
NEXTAUTH_SECRET=your-secret-key-here-change-this-in-production
NEXTAUTH_URL=http://localhost:3000
NODE_ENV=development
DATABASE_PATH=./data/students.db
JWT_SECRET=your-jwt-secret-key-here
```

### 3. **[vercel.json](vercel.json)** - Vercel Deployment Config
This file specifies which environment variables are REQUIRED for Vercel deployment:

```json
{
  "env": {
    "NEXTAUTH_SECRET": {
      "required": true
    },
    "NEXTAUTH_URL": {
      "required": false
    },
    "NODE_ENV": "production"
  }
}
```

## Environment Variables Explained

| Variable | Purpose | Development Value | Production Value (Vercel) |
|----------|---------|-------------------|---------------------------|
| **NEXTAUTH_SECRET** | Encrypts JWT tokens and secrets | ✅ `amxVQiTnqibWe4qeJ6J3xImVnKk4OiSVBuoXdVuZn/c=` | ✅ Same or generate new: `node -e "require('crypto').randomBytes(32).toString('base64')"` |
| **NEXTAUTH_URL** | NextAuth callback URL | `http://localhost:3000` | `https://your-vercel-domain.vercel.app` |
| **JWT_SECRET** | JWT token signing secret | ✅ `v/YTUHdmavn3Jkd5APkIcZ8nnUlkEYU7NMwPZeeLD9E=` | ✅ Same or generate new |
| **NODE_ENV** | Execution environment | `development` | `production` |
| **DATABASE_PATH** | SQLite database location | `./data/students.db` | `./data/students.db` |

## For Vercel Deployment

### Step 1: Get Your Vercel Domain
After connecting your repository to Vercel, you'll get a domain like: `https://sm-theta.vercel.app`

### Step 2: Set Environment Variables in Vercel
Go to your Vercel project → Settings → Environment Variables

Add these 4 variables:

```
NEXTAUTH_SECRET = amxVQiTnqibWe4qeJ6J3xImVnKk4OiSVBuoXdVuZn/c=
NEXTAUTH_URL = https://sm-theta.vercel.app  (replace with your domain)
JWT_SECRET = v/YTUHdmavn3Jkd5APkIcZ8nnUlkEYU7NMwPZeeLD9E=
NODE_ENV = production
```

### Step 3: Redeploy
Trigger a new deployment in Vercel after setting the environment variables.

## Generated Secrets Reference

These secrets were generated on 2026-02-27 for your project:

```
NEXTAUTH_SECRET: amxVQiTnqibWe4qeJ6J3xImVnKk4OiSVBuoXdVuZn/c=
JWT_SECRET:     v/YTUHdmavn3Jkd5APkIcZ8nnUlkEYU7NMwPZeeLD9E=
```

**⚠️ IMPORTANT SECURITY NOTES:**
- Keep these secrets PRIVATE - never share publicly
- Store the JWT_SECRET securely in Vercel environment as well
- For production, consider rotating secrets periodically
- If you need new secrets, run: `node -e "require('crypto').randomBytes(32).toString('base64')"`

## How to Generate New Secrets (if needed)

```bash
# On Windows PowerShell / cmd:
node -e "require('crypto').randomBytes(32).toString('base64')"

# On Linux/Mac:
openssl rand -base64 32
```

## Testing Your Configuration

1. **Development**: Application uses `.env.local` values automatically
2. **Vercel**: Application uses environment variables set in Vercel dashboard
3. **Verify**: After deployment, log in to test that authentication works

---

**Last Updated**: February 27, 2026
**Project**: Student Management App
**Ready for Production**: ✅ Yes
