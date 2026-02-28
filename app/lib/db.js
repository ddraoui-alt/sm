import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';
import fs from 'fs';

let db = null;

async function getDb() {
  if (db) {
    return db;
  }

  let dbPath = process.env.DATABASE_PATH || './data/students.db';
  
  // For Vercel environment, use /tmp directory which is writable
  if (process.env.VERCEL) {
    dbPath = '/tmp/students.db';
  }
  
  const dir = path.dirname(dbPath);

  // Ensure directory exists
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  db = await open({
    filename: dbPath,
    driver: sqlite3.Database,
  });

  await db.exec('PRAGMA foreign_keys = ON');
  await initializeDb(db);

  return db;
}

async function initializeDb(db) {
  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      name TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS students (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      matricule TEXT UNIQUE NOT NULL,
      nom TEXT NOT NULL,
      prenom TEXT NOT NULL,
      email TEXT,
      telephone TEXT,
      date_naissance DATE,
      adresse TEXT,
      filiere TEXT,
      niveau TEXT,
      statut TEXT DEFAULT 'actif',
      date_inscription DATETIME DEFAULT CURRENT_TIMESTAMP,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS grades (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      student_id INTEGER NOT NULL,
      subject TEXT NOT NULL,
      grade REAL,
      date_exam DATE,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
    );

    CREATE INDEX IF NOT EXISTS idx_students_matricule ON students(matricule);
    CREATE INDEX IF NOT EXISTS idx_students_email ON students(email);
    CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
  `);

  // Seed test user for demo/testing purposes
  await seedTestUser(db);
}

async function seedTestUser(db) {
  try {
    const bcrypt = (await import('bcryptjs')).default;
    
    const existingUser = await db.get(
      'SELECT id FROM users WHERE email = ?',
      ['test@example.com']
    );

    if (!existingUser) {
      const hashedPassword = await bcrypt.hash('password123', 10);
      await db.run(
        'INSERT INTO users (email, password, name) VALUES (?, ?, ?)',
        ['test@example.com', hashedPassword, 'Test User']
      );
    }
  } catch (error) {
    console.error('Error seeding test user:', error);
    // Don't throw - continue even if seeding fails
  }
}

export { getDb };
