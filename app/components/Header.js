'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Header() {
  const { data: session } = useSession();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push('/auth/login');
  };

  return (
    <header>
      <nav>
        <h1>📚 Gestion des Étudiants</h1>
        <ul>
          <li><Link href="/">Accueil</Link></li>
          {session ? (
            <>
              <li><Link href="/students">Étudiants</Link></li>
              <li><span>{session.user?.email}</span></li>
              <li><button onClick={handleSignOut}>Déconnexion</button></li>
            </>
          ) : (
            <>
              <li><Link href="/auth/login">Connexion</Link></li>
              <li><Link href="/auth/register">Inscription</Link></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
