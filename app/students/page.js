'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function StudentsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login');
    }
  }, [status, router]);

  useEffect(() => {
    if (session) {
      fetchStudents();
    }
  }, [session]);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/students');
      if (!response.ok) throw new Error('Failed to fetch');
      const data = await response.json();
      setStudents(data);
    } catch (err) {
      setError('Erreur lors du chargement des étudiants');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet étudiant?')) {
      try {
        const response = await fetch(`/api/students/${id}`, {
          method: 'DELETE',
        });
        if (!response.ok) throw new Error('Failed to delete');
        setStudents(students.filter(s => s.id !== id));
      } catch (err) {
        setError('Erreur lors de la suppression');
      }
    }
  };

  if (status === 'loading' || loading) {
    return <div className="container"><p>Chargement...</p></div>;
  }

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
        <h1>Liste des Étudiants</h1>
        <Link href="/students/add"><button>➕ Ajouter un étudiant</button></Link>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      {students.length === 0 ? (
        <p>Aucun étudiant enregistré.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Matricule</th>
              <th>Nom</th>
              <th>Prénom</th>
              <th>Email</th>
              <th>Filière</th>
              <th>Niveau</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td>{student.matricule}</td>
                <td>{student.nom}</td>
                <td>{student.prenom}</td>
                <td>{student.email || '-'}</td>
                <td>{student.filiere || '-'}</td>
                <td>{student.niveau || '-'}</td>
                <td>
                  <div className="btn-group">
                    <Link href={`/students/${student.id}`}>
                      <button className="btn-small">✏️ Modifier</button>
                    </Link>
                    <button 
                      className="btn-small btn-danger"
                      onClick={() => handleDelete(student.id)}
                    >
                      🗑️ Supprimer
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
