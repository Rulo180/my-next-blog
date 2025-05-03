import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';
import * as yup from 'yup';

import { authConfig } from '@/auth.config';
import { getUser } from '@/actions/users';
import { User } from '@/app/lib/definitions';

export const { auth, signIn, signOut, handlers } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const schema = yup.object().shape({
          email: yup.string().email().required(),
          password: yup.string().min(6).required(),
        });

        try {
          const parsedCredentials = await schema.validate(credentials);
          const { email, password } = parsedCredentials;
          const user = await getUser(email, true) as User & { password: string };
          if (!user) return null;
          const passwordsMatch = await bcrypt.compare(password, user.password);
          
          if (passwordsMatch) return user;
        } catch (error) {
          console.error('Validation or user fetch error:', error);
          return null;
        }

        return null;
      },
    }),
  ],
  callbacks: {
    session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.sub,
        },
      }
    },
  },
});
