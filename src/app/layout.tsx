import type { Metadata } from "next";
import Provider from '@/app/provider';

import "./globals.css";
import { geistMono, geistSans } from '@/app/ui/fonts';
import Header from "@/app/ui/components/Header";
import NavBar from "@/app/ui/components/NavBar";


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
          <Header />
          <NavBar />
          <main>
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
}
