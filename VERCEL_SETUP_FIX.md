# 🚀 Vercel Deployment - Complete Setup Guide

## ⚠️ Current Issue: 404 Error

The 404 error indicates the environment variables are not properly configured on Vercel. Follow these steps carefully to fix it.

---

## 📋 Step-by-Step Fix

### **Step 1: Go to Vercel Dashboard**
1. Visit https://vercel.com/dashboard
2. Find your project (`app-tau-drab-65` or `sm5-gamma`)
3. Click on it to open the project settings

### **Step 2: Set Environment Variables** ⭐ CRITICAL
Click **Settings** → **Environment Variables** and add these variables:

| Variable | Value | Example |
|----------|-------|---------|
| `NEXTAUTH_SECRET` | Copy from `.env.local` file | `amxVQiTnqibWe4qeJ6J3xImVnKk4OiSVBuoXdVuZn/c=` |
| `NEXTAUTH_URL` | Your Vercel domain | `https://app-tau-drab-65.vercel.app` |
| `JWT_SECRET` | Copy from `.env.local` file | `v/YTUHdmavn3Jkd5APkIcZ8nnUlkEYU7NMwPZeeLD9E=` |
| `NODE_ENV` | Leave as is | `production` |

**⚠️ IMPORTANT:**
- Get your `NEXTAUTH_SECRET` from: [.env.local](.env.local)
- Get your `JWT_SECRET` from: [.env.local](.env.local)
- Your domain is shown in the Vercel URL bar

### **Step 3: Redeploy**
1. Go to **Deployments** tab
2. Click the 3 dots menu on the latest deployment
3. Select **Redeploy**
4. Wait for build to complete (2-3 minutes)

---

## ✅ What to Expect After Fix

### **Health Check**
Visit this URL to verify the app is working:
```
https://your-vercel-domain.vercel.app/api/health
```

Should show:
```json
{
  "status": "Application is running",
  "environment": {
    "nodeEnv": "production",
    "isVercel": true,
    "nextAuthUrl": "✓ Set",
    "nextAuthSecret": "✓ Set"
  }
}
```

### **Login**
1. Visit `https://your-vercel-domain.vercel.app/auth/login`
2. Use test credentials:
   - Email: `test@example.com`
   - Password: `password123`

### **Add Student**
1. After login, go to `/students/add`
2. Fill in the student form
3. Submit to create a student

---

## 🔧 Your Current Environment Variables

From `.env.local`:

```env
NEXTAUTH_SECRET=amxVQiTnqibWe4qeJ6J3xImVnKk4OiSVBuoXdVuZn/c=
NEXTAUTH_URL=http://localhost:3000
NODE_ENV=development
DATABASE_PATH=./data/students.db
JWT_SECRET=v/YTUHdmavn3Jkd5APkIcZ8nnUlkEYU7NMwPZeeLD9E=
```

**For Vercel**, use:
- `NEXTAUTH_SECRET`: Same value
- `NEXTAUTH_URL`: Your Vercel domain (e.g., https://app-tau-drab-65.vercel.app)
- `JWT_SECRET`: Same value
- `NODE_ENV`: `production`

---

## 🐛 Troubleshooting

### **Still Getting 404?**
1. ✓ Check environment variables are set in Vercel dashboard
2. ✓ Verify NEXTAUTH_URL exactly matches your Vercel domain
3. ✓ Wait 5 minutes and refresh the page (caching)
4. ✓ Check Vercel deployment logs for errors

### **Can't Log In?**
1. Check database debug: https://your-domain.vercel.app/api/debug/db-status
2. Verify credentials: test@example.com / password123
3. Check Vercel logs for authentication errors

### **Students Not Saving?**
- This is expected on Vercel with SQLite because `/tmp` is temporary
- **Recommendation**: Migrate to PostgreSQL (Supabase) for production

---

## 🎯 Quick Summary

1. **Go to Vercel dashboard**
2. **Add 3 environment variables** (NEXTAUTH_SECRET, NEXTAUTH_URL, JWT_SECRET)
3. **Redeploy**
4. **Test with health check endpoint**

That's it! The 404 error should be fixed.

---

## 📞 Need Help?

If you're still seeing errors, share:
1. The error message
2. Your Vercel domain URL
3. Environment variables you added (without secrets)

Let's fix it! ✅
