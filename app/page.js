'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';

export default function Home() {
  const { data: session } = useSession();

  return (
    <div className="container">
      <h1 style={{ marginBottom: '20px', marginTop: '20px' }}>Bienvenue dans l'application de gestion des étudiants</h1>
      
      {session ? (
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '4px' }}>
          <h2>Bienvenue, {session.user?.email}!</h2>
          <p>Vous êtes connecté. Vous pouvez maintenant:</p>
          <ul style={{ marginLeft: '20px', marginTop: '15px' }}>
            <li><Link href="/students">Consulter la liste des étudiants</Link></li>
            <li><Link href="/students/add">Ajouter un nouvel étudiant</Link></li>
            <li><Link href="/students/search">Rechercher un étudiant</Link></li>
          </ul>
        </div>
      ) : (
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '4px' }}>
          <p>Veuillez vous <Link href="/auth/login">connecter</Link> ou <Link href="/auth/register">créer un compte</Link> pour accéder à l'application.</p>
        </div>
      )}
    </div>
  );
}
