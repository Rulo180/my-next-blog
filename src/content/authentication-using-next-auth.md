---
title: "Authentication Using Next-Auth"
description: "A guide to implementing authentication in Next.js using Next-Auth."
duration: 5
date: "2025-05-04"
---

# Authentication Using Next-Auth

Authentication is a critical part of most web applications. In our project, we use Next-Auth to handle authentication seamlessly in a Next.js environment. Here's how we set it up and use it.

## Setting Up Next-Auth

The core of our authentication logic resides in the `auth.ts` file. Here's a simplified version:

```ts
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.sub;
      return session;
    },
  },
};

export default NextAuth(authOptions);
```

### Key Points
- **Providers**: We use the Google provider for OAuth authentication. You can add more providers as needed.
- **Callbacks**: The `session` callback enriches the session object with additional user data.

## Protecting API Routes

To secure API routes, we use the `getServerSession` function. Here's an example from the `route.ts` file:

```ts
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/auth";

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  return new Response(JSON.stringify({ message: "Authenticated" }));
}
```

### Key Points
- **Session Validation**: The `getServerSession` function checks if the user is authenticated.
- **Response Handling**: If the user is not authenticated, the API returns a 401 status.

## Using the Session in Components

To access session data in components, we use the `useSession` hook. Here's an example from the `Header` component:

```tsx
"use client";

import { useSession, signIn, signOut } from "next-auth/react";

const Header = () => {
  const { data: session } = useSession();

  return (
    <header>
      {session ? (
        <div>
          <p>Welcome, {session.user.name}</p>
          <button onClick={() => signOut()}>Sign Out</button>
        </div>
      ) : (
        <button onClick={() => signIn()}>Sign In</button>
      )}
    </header>
  );
};

export default Header;
```

### Key Points
- **Session Data**: The `useSession` hook provides access to the current user's session.
- **Sign-In/Sign-Out**: The `signIn` and `signOut` functions handle authentication actions.

## Conclusion

Next-Auth simplifies authentication in Next.js applications by providing a robust and flexible API. Whether you're securing API routes or managing user sessions in components, Next-Auth has you covered.