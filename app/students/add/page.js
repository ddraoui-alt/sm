'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

export default function AddStudentPage() {
  const { status } = useSession();
  const router = useRouter();
  const [formData, setFormData] = useState({
    matricule: '',
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    date_naissance: '',
    adresse: '',
    filiere: '',
    niveau: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (status === 'unauthenticated') {
    router.push('/auth/login');
    return null;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to add student');
      }

      router.push('/students?success=Student added successfully');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1 style={{ marginTop: '20px' }}>Ajouter un nouvel étudiant</h1>
      
      {error && <div className="alert alert-error">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
          <input
            type="text"
            name="matricule"
            placeholder="Matricule *"
            value={formData.matricule}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="nom"
            placeholder="Nom *"
            value={formData.nom}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="prenom"
            placeholder="Prénom *"
            value={formData.prenom}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="tel"
            name="telephone"
            placeholder="Téléphone"
            value={formData.telephone}
            onChange={handleChange}
          />
          <input
            type="date"
            name="date_naissance"
            placeholder="Date de naissance"
            value={formData.date_naissance}
            onChange={handleChange}
          />
          <input
            type="text"
            name="adresse"
            placeholder="Adresse"
            value={formData.adresse}
            onChange={handleChange}
            style={{ gridColumn: '1/-1' }}
          />
          <input
            type="text"
            name="filiere"
            placeholder="Filière"
            value={formData.filiere}
            onChange={handleChange}
          />
          <select
            name="niveau"
            value={formData.niveau}
            onChange={handleChange}
          >
            <option value="">Sélectionner un niveau</option>
            <option value="L1">Licence 1</option>
            <option value="L2">Licence 2</option>
            <option value="L3">Licence 3</option>
            <option value="M1">Master 1</option>
            <option value="M2">Master 2</option>
          </select>
        </div>

        <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
          <button type="submit" disabled={loading}>
            {loading ? 'Ajout en cours...' : 'Ajouter l\'étudiant'}
          </button>
          <Link href="/students">
            <button type="button" style={{ backgroundColor: '#95a5a6' }}>
              Annuler
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}
