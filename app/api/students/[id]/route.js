import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { getDb } from '@/app/lib/db';
import { handler as authHandler } from '@/app/api/auth/[...nextauth]/route';

async function GET(request, { params }) {
  try {
    const session = await getServerSession(authHandler);
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const db = await getDb();
    const student = await db.get(
      'SELECT * FROM students WHERE id = ?',
      [params.id]
    );

    if (!student) {
      return NextResponse.json(
        { error: 'Student not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(student);
  } catch (error) {
    console.error('Error fetching student:', error);
    return NextResponse.json(
      { error: 'Failed to fetch student' },
      { status: 500 }
    );
  }
}

async function PUT(request, { params }) {
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

    const { matricule, nom, prenom, email, telephone, date_naissance, adresse, filiere, niveau, statut } = data;

    await db.run(
      `UPDATE students SET matricule = ?, nom = ?, prenom = ?, email = ?, telephone = ?, 
       date_naissance = ?, adresse = ?, filiere = ?, niveau = ?, statut = ?, updated_at = CURRENT_TIMESTAMP
       WHERE id = ?`,
      [matricule, nom, prenom, email, telephone, date_naissance, adresse, filiere, niveau, statut, params.id]
    );

    return NextResponse.json({ message: 'Student updated successfully' });
  } catch (error) {
    console.error('Error updating student:', error);
    return NextResponse.json(
      { error: 'Failed to update student' },
      { status: 500 }
    );
  }
}

async function DELETE(request, { params }) {
  try {
    const session = await getServerSession(authHandler);
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const db = await getDb();
    await db.run('DELETE FROM students WHERE id = ?', [params.id]);

    return NextResponse.json({ message: 'Student deleted successfully' });
  } catch (error) {
    console.error('Error deleting student:', error);
    return NextResponse.json(
      { error: 'Failed to delete student' },
      { status: 500 }
    );
  }
}

export { GET, PUT, DELETE };
