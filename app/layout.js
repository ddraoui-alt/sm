import './globals.css';
import Header from './components/Header';
import { Providers } from './providers';

export const metadata = {
  title: 'Gestion des Étudiants',
  description: 'Application complète de gestion des étudiants',
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>
        <Providers>
          <Header />
          <main className="container">
            {children}
          </main>
          <footer>
            <p>&copy; 2026 Gestion des Étudiants. Tous droits réservés.</p>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
