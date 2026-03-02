import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    return NextResponse.json({
      status: 'Application is running',
      timestamp: new Date().toISOString(),
      environment: {
        nodeEnv: process.env.NODE_ENV,
        isVercel: !!process.env.VERCEL,
        nextAuthUrl: process.env.NEXTAUTH_URL ? '✓ Set' : '✗ Not set',
        nextAuthSecret: process.env.NEXTAUTH_SECRET ? '✓ Set' : '✗ Not set',
      },
      message: 'If NEXTAUTH_SECRET or NEXTAUTH_URL are not set, configure them in Vercel dashboard'
    });
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
