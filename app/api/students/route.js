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
    console.log('Creating student with data:', data);
    
    const db = await getDb();

    const { matricule, nom, prenom, email, telephone, date_naissance, adresse, filiere, niveau } = data;

    if (!matricule || !nom || !prenom) {
      console.warn('Missing required fields:', { matricule, nom, prenom });
      return NextResponse.json(
        { error: 'Missing required fields: matricule, nom, prenom are required' },
        { status: 400 }
      );
    }

    try {
      const result = await db.run(
        `INSERT INTO students (matricule, nom, prenom, email, telephone, date_naissance, adresse, filiere, niveau)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [matricule, nom, prenom, email || null, telephone || null, date_naissance || null, adresse || null, filiere || null, niveau || null]
      );

      console.log('✓ Student created successfully with ID:', result.lastID);

      return NextResponse.json(
        { 
          id: result.lastID, 
          message: 'Student added successfully',
          student: { matricule, nom, prenom, email }
        },
        { status: 201 }
      );
    } catch (dbError) {
      console.error('Database error:', dbError.message);
      
      if (dbError.message.includes('UNIQUE')) {
        return NextResponse.json(
          { error: 'A student with this matricule already exists' },
          { status: 409 }
        );
      }
      
      throw dbError;
    }
  } catch (error) {
    console.error('Error adding student:', error.message);
    return NextResponse.json(
      { error: error.message || 'Failed to add student' },
      { status: 500 }
    );
  }
}

export { GET, POST };
