import type { Metadata } from "next";
import { Grid, GridItem } from "@chakra-ui/react";

import Provider from "@/app/provider";
import { geistMono, geistSans } from "@/app/ui/fonts";
import Footer from "@/app/ui/components/layout/Footer";
import Header from "@/app/ui/components/layout/Header";
import NavBar from "@/app/ui/components/layout/NavBar";
import "./globals.css";

export const metadata: Metadata = {
  title: "My NextJS Blog",
  description: "Playground Project for NextJS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider>
          <Grid
            templateRows="auto auto 1fr auto"
            templateColumns="1fr"
            height="100vh"
          >
            <GridItem>
              <Header />
            </GridItem>
            <GridItem>
              <NavBar />
            </GridItem>
            <GridItem>
              {children}
            </GridItem>
            <GridItem>
              <Footer />
            </GridItem>
          </Grid>
        </Provider>
      </body>
    </html>
  );
}
