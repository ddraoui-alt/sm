import { NextResponse } from 'next/server';
import { getDb } from '@/app/lib/db';

export async function GET(request) {
  try {
    const db = await getDb();
    
    // Check if tables exist
    const users = await db.all('SELECT COUNT(*) as count FROM users');
    const students = await db.all('SELECT COUNT(*) as count FROM students');
    
    // List all users (without passwords)
    const usersList = await db.all('SELECT id, email, name, created_at FROM users');
    
    return NextResponse.json({
      status: 'ok',
      database: {
        usersCount: users[0]?.count || 0,
        studentsCount: students[0]?.count || 0,
        users: usersList,
      },
      environment: {
        isVercel: !!process.env.VERCEL,
        nodeEnv: process.env.NODE_ENV,
      },
      message: 'Test user should be created with: test@example.com / password123'
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: 'error',
        error: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}
