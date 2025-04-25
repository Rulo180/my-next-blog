import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    session({ session, user }) {
      if (user?.id) {
        session.user.id = user.id; // Add user ID to session object
      }
      return session;
    },
    authorized({ auth }) {
      const isLoggedIn = !!auth?.user;
      if (isLoggedIn) return true;
      return false; // Redirect unauthenticated users to login page
    },
  },
  providers: [],
} satisfies NextAuthConfig;