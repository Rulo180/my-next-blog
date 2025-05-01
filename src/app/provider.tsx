"use client"

import { ChakraProvider, createSystem, defaultConfig, defineConfig } from "@chakra-ui/react"
import { ThemeProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";

const config = defineConfig({
  theme: {
    semanticTokens: {
      colors: {
        primary: { value: "#6601ea" },
      },
    },
  },
});

const system = createSystem(defaultConfig, config);

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ChakraProvider value={system}>
        <ThemeProvider attribute="class" disableTransitionOnChange>
          {props.children}
        </ThemeProvider>
      </ChakraProvider>
    </SessionProvider>
  )
}