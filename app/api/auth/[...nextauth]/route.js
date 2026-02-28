import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { getDb } from "@/app/lib/db";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Mot de passe", type: "password" }
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            console.warn('Missing credentials');
            return null;
          }

          console.log(`Attempting login for: ${credentials.email}`);
          
          const db = await getDb();
          const user = await db.get(
            'SELECT * FROM users WHERE email = ?',
            [credentials.email]
          );

          if (!user) {
            console.warn(`User not found: ${credentials.email}`);
            return null;
          }

          console.log(`User found: ${credentials.email}, verifying password...`);
          
          const passwordMatch = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!passwordMatch) {
            console.warn(`Invalid password for user: ${credentials.email}`);
            return null;
          }

          console.log(`✓ User authenticated: ${credentials.email}`);
          
          return {
            id: user.id.toString(),
            name: user.name,
            email: user.email
          };
        } catch (error) {
          console.error("Auth error:", error.message);
          return null;
        }
      }
    })
  ],
  pages: {
    signIn: '/auth/login',
  },
  session: {
    strategy: "jwt",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST, handler };