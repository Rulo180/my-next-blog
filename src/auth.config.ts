import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth }) {
      const isLoggedIn = !!auth?.user;
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
    },
  },
  providers: [],
} satisfies NextAuthConfig;