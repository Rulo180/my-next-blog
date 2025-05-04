---
title: "How to Get the Session Data from a Client Component"
description: "Learn how to access session data in both Server and Client components in Next.js."
duration: 3
imageUrl: "/images/posts/data-image.jpg"
date: "2025-04-22"

---

# How to Get the Session Data from a Client Component

In Next.js, you can access session data in both Server and Client components. This post focuses on how to retrieve session data in Client components using the `useSession` hook.

## Accessing Session Data in a Client Component

Here’s an example from the `CommentForm` component:

```tsx
// CommentForm.tsx
import { useSession } from "next-auth/react";
import { saveComment } from "@/actions/comments";

const CommentForm: React.FC<{ postId: string }> = ({ postId }) => {
  const { data: session } = useSession();

  return (
    <form>
      <textarea placeholder="Write a comment..." disabled={!session} />
      <button type="submit" disabled={!session}>
        Submit
      </button>
      {!session && (
        <p>
          <a href={`/login?callbackUrl=/blog/${postId}`}>Log in</a> to publish a comment.
        </p>
      )}
    </form>
  );
};

export default CommentForm;
```

### Key Points
- **Session Check**: The `useSession` hook provides the current session data.
- **Conditional Rendering**: If no user is logged in, a message with a login link is displayed.

## Wrapping Your App with `SessionProvider`

To use the `useSession` hook, wrap your app with the `SessionProvider`. In our project, this is done in the `provider.ts` file:

```tsx
// provider.ts
"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { ThemeProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ChakraProvider>
        <ThemeProvider attribute="class">
          {children}
        </ThemeProvider>
      </ChakraProvider>
    </SessionProvider>
  );
}
```

### Key Points
- **Global Access**: Wrapping your app with `SessionProvider` makes session data accessible throughout the app.
- **Integration**: The `SessionProvider` integrates seamlessly with other providers like Chakra UI and ThemeProvider.

## Conclusion

By using the `useSession` hook and wrapping your app with `SessionProvider`, you can easily access session data in Client components. This approach ensures a consistent and secure way to manage user sessions across your application.