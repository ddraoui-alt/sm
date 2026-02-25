import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { getDb } from '@/app/lib/db';
import { handler as authHandler } from '@/app/api/auth/[...nextauth]/route';

async function GET(request) {
  try {
    const session = await getServerSession(authHandler);
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const db = await getDb();
    const students = await db.all(`
      SELECT * FROM students ORDER BY nom, prenom
    `);

    return NextResponse.json(students);
  } catch (error) {
    console.error('Error fetching students:', error);
    return NextResponse.json(
      { error: 'Failed to fetch students' },
      { status: 500 }
    );
  }
}

async function POST(request) {
  try {
    const session = await getServerSession(authHandler);
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const data = await request.json();
    const db = await getDb();

    const { matricule, nom, prenom, email, telephone, date_naissance, adresse, filiere, niveau } = data;

    if (!matricule || !nom || !prenom) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const result = await db.run(
      `INSERT INTO students (matricule, nom, prenom, email, telephone, date_naissance, adresse, filiere, niveau)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [matricule, nom, prenom, email || null, telephone || null, date_naissance || null, adresse || null, filiere || null, niveau || null]
    );

    return NextResponse.json(
      { id: result.lastID, message: 'Student added successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error adding student:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to add student' },
      { status: 500 }
    );
  }
}

export { GET, POST };
