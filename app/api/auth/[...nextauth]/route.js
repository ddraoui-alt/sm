import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Mot de passe", type: "password" }
      },
      async authorize(credentials) {
        // Had l-ma3loumat bach d-dkhel l-site
        if (credentials.email === "admin@test.com" && credentials.password === "admin123") {
          return { id: "1", name: "Admin", email: "admin@test.com" };
        }
        return null;
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

// Hada hwa s-satar li k-iholl l-mouchkil dyal l-Build
export { handler as GET, handler as POST, handler };