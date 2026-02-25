# Development Guide

## Getting Started with Development

### Setup

1. Install Node.js 16+ and npm
2. Clone the repository
3. Install dependencies: `npm install`
4. Copy `.env.example` to `.env.local` and fill in values
5. Start development server: `npm run dev`

### Project Structure

```
student-app/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   │   ├── auth/          # Authentication routes
│   │   └── students/      # Student API endpoints
│   ├── auth/              # Authentication pages
│   ├── students/          # Student management pages
│   ├── components/        # Reusable components
│   ├── lib/               # Utility functions
│   ├── layout.js          # Root layout
│   ├── page.js            # Home page
│   └── globals.css        # Global styles
├── public/                # Static assets
├── .env.local             # Environment variables (local only)
├── .env.example           # Environment template
├── next.config.js         # Next.js configuration
├── jsconfig.json          # JS path aliases
├── vercel.json            # Vercel deployment config
└── package.json           # Dependencies
```

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint

# Install new package
npm install package-name

# Uninstall package
npm uninstall package-name

# Update packages
npm update
```

## Database

### SQLite

The application uses SQLite for data persistence.

**Database location**: `./data/students.db`

**Schema**:
- `users`: User authentication
- `students`: Student records
- `grades`: Student grades (optional)

### Initialize Database

Database automatically initializes on first API call to `/api/students`.

### Database Operations

All database operations are in `app/lib/db.js`:

```javascript
import { getDb } from '@/app/lib/db';

const db = await getDb();
const user = await db.get('SELECT * FROM users WHERE id = ?', [userId]);
await db.run('INSERT INTO students (name, ...) VALUES (?, ...)', [...]);
```

## Authentication

### NextAuth Configuration

- File: `app/api/auth/[...nextauth]/route.js`
- Strategy: Credentials (email/password)
- Session: JWT-based

### Protected Routes

Wrap components with `useSession()`:

```javascript
'use client';
import { useSession } from 'next-auth/react';

export default function ProtectedPage() {
  const { data: session, status } = useSession();
  
  if (status === 'loading') return <p>Loading...</p>;
  if (status === 'unauthenticated') return <p>Not authenticated</p>;
  
  return <p>Welcome {session.user.email}</p>;
}
```

## API Routes

All API routes require authentication.

### Base URL
- Development: `http://localhost:3000/api`
- Production: `https://your-domain.com/api`

### Endpoints

**Students**:
- `GET /api/students` - List all students
- `POST /api/students` - Create student
- `GET /api/students/[id]` - Get one student
- `PUT /api/students/[id]` - Update student
- `DELETE /api/students/[id]` - Delete student

**Auth**:
- `POST /api/auth/register` - Register new user
- `POST /api/auth/[...nextauth]` - NextAuth routes

### Example API Call

```javascript
const response = await fetch('/api/students', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
});

const data = await response.json();
```

## Styling

### CSS Structure

- `app/globals.css` - Global styles
- Component-specific styles: inline with `style` prop

### Color Scheme

- Primary: #3498db (Blue)
- Dark: #2c3e50 (Dark Blue)
- Success: #27ae60 (Green)
- Danger: #e74c3c (Red)
- Light: #ecf0f1 (Light Gray)

## Adding New Features

### Add a New API Route

1. Create file: `app/api/[resource]/route.js`
2. Export GET, POST, PUT, DELETE functions
3. Add authentication check
4. Use database operations

```javascript
// app/api/myresource/route.js
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { handler as authHandler } from '@/app/api/auth/[...nextauth]/route';

export async function GET(request) {
  const session = await getServerSession(authHandler);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  
  // Your logic here
  return NextResponse.json(data);
}
```

### Add a New Page

1. Create directory: `app/mypage/`
2. Create file: `app/mypage/page.js`
3. Use `'use client'` for client components
4. Add SessionProvider if needed

```javascript
'use client';
import { useSession } from 'next-auth/react';

export default function MyPage() {
  const { data: session } = useSession();
  return <h1>Hello {session?.user?.email}</h1>;
}
```

## Testing

### Manual Testing

1. Start dev server: `npm run dev`
2. Visit `http://localhost:3000`
3. Register e-mail and password
4. Login
5. Test features

### Test Data

Register with:
- Email: `test@example.com`
- Password: `password123`

Add student:
- Matricule: `STU001`
- Nom: `Dupont`
- Prénom: `Jean`
- Filière: `Informatique`
- Niveau: `L2`

## Debugging

### Enable Debug Logs

Set environment variable:
```bash
DEBUG=* npm run dev
```

### Browser DevTools

1. Open Chrome DevTools (F12)
2. Check Console tab for errors
3. Check Network tab for API calls
4. Check Application tab for cookies/storage

### VSCode Debugging

Create `.vscode/launch.json`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Next.js",
      "type": "node",
      "request": "attach",
      "port": 9229
    }
  ]
}
```

Run with debugging:
```bash
NODE_OPTIONS='--inspect' npm run dev
```

## Performance Tips

1. Use `Image` component for images
2. Lazy load components with `dynamic()`
3. Optimize database queries (use indexes)
4. Implement pagination for large datasets
5. Cache API responses when appropriate

## Common Issues

### Port Already in Use

```bash
# Find process using port 3000
lsof -i :3000

# Or on Windows
netstat -ano | findstr :3000

# Kill process
kill -9 <PID>
```

### Database Locked

Remove `.db-lock` file and restart server.

### Session Not Working

Ensure:
- `NEXTAUTH_SECRET` is set
- `NEXTAUTH_URL` matches application URL
- SessionProvider wraps entire app

## Contributing

1. Create feature branch: `git checkout -b feature/name`
2. Make changes
3. Test thoroughly
4. Commit: `git commit -m "Add feature"`
5. Push: `git push origin feature/name`
6. Create pull request

---

**Happy Coding!** 🚀
