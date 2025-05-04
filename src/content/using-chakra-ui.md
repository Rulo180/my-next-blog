---
title: "Using Chakra UI in Your Next.js Project"
description: "Learn how to integrate and use the Chakra UI component library in your Next.js application."
duration: 4
date: "2025-05-04"
---

# Using Chakra UI in Your Next.js Project

Chakra UI is a modern React component library that makes it easy to build accessible and responsive user interfaces. In this post, we’ll explore how we integrated Chakra UI into our Next.js project and highlight some of its key features.

## Setting Up Chakra UI

To get started with Chakra UI, you need to install the library and its peer dependencies:

```bash
npm install @chakra-ui/react @emotion/react @emotion/styled framer-motion
```

Once installed, wrap your application with the `ChakraProvider` to enable Chakra UI’s theming and styling capabilities. In our project, we did this in the `provider.ts` file:

```tsx
"use client";

import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
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
  );
}
```

## Example: Building a Button Component

Chakra UI provides a set of pre-styled components that are easy to customize. Here’s an example of a button component:

```tsx
import { Button } from "@chakra-ui/react";

const CustomButton = () => {
  return (
    <Button colorScheme="teal" size="md">
      Click Me
    </Button>
  );
};

export default CustomButton;
```

### Key Features
- **Color Schemes**: Easily apply consistent color schemes using the `colorScheme` prop.
- **Responsive Design**: Use size props like `sm`, `md`, and `lg` to adjust the button size.

## Example: Using Flex for Layouts

Chakra UI’s `Flex` component simplifies creating flexible layouts. Here’s an example:

```tsx
import { Flex, Box } from "@chakra-ui/react";

const LayoutExample = () => {
  return (
    <Flex justifyContent="space-between" alignItems="center" p={4}>
      <Box>Left Content</Box>
      <Box>Right Content</Box>
    </Flex>
  );
};

export default LayoutExample;
```

### Key Features
- **Alignment**: Use `justifyContent` and `alignItems` for alignment.
- **Spacing**: Apply padding and margins using shorthand props like `p` and `m`.

## Why Use Chakra UI?
- **Accessibility**: Built-in accessibility features ensure your app is usable by everyone.
- **Customizability**: Easily customize components to match your design system.
- **Developer Experience**: Intuitive APIs and excellent documentation make it a joy to use.

By integrating Chakra UI, we’ve streamlined our development process and created a more consistent and accessible user interface. Whether you’re building a small project or a large application, Chakra UI is a great choice for your Next.js project.