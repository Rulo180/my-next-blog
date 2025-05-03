---
title: "How to get the session data from a Client component"
description: "In this short post we are going to show how you can access your session data from the server and the client."
duration: 3
imageUrl: "/images/posts/data-image--desktop.jpg"
date: "2025-04-30"
---
# How to get the session data from a Client component

Inside Server components you can directly access the session data through the @auth library we created, but in Client components you can use the `useSession` hook like so:

``` ts
// CommentForm.tsx
...
import { useSession } from "next-auth/react";

import { saveComment } from "@/actions/comments";

const CommentForm: React.FC<{ postId: string }> = ({ postId }) => {
  const { data: session } = useSession();
  const [state, formAction, isPending] = useActionState(saveComment, null);

  return (
  ...
  <Flex mt="4" justifyContent={session ? 'flex-end' : 'space-between'} alignItems="center">
        {!session && (
          <Text>
            <ChakraLink asChild>
              <Link href={`/login?callbackUrl=/blog/${postId}`}>Log in</Link>
            </ChakraLink>{" "}
            to publish a comment
          </Text>
        )}
        <Button
          type="submit"
          colorPalette="gray"
          variant="surface"
          disabled={!session}
        >
          Submit
        </Button>
      </Flex>
    ...
```

In this case, I wanna to render a message with a link to the login page if there is no logged in user.

To use the `useSession` hook you have to wrap your app with the `<SessionProvider />`. In my case, the best option to do this is the provider.ts file

``` ts
// provider.ts
"use client"

import { ChakraProvider, defaultSystem } from "@chakra-ui/react"
import { ThemeProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ChakraProvider value={defaultSystem}>
        <ThemeProvider attribute="class" disableTransitionOnChange>
          {props.children}
        </ThemeProvider>
      </ChakraProvider>
    </SessionProvider>
  )
}
```

There you have it! Now you can access your session data from anywhere in your app.