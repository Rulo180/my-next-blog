import type { Metadata } from "next";
import Provider from '@/app/provider';

import "./globals.css";
import { geistMono, geistSans } from '@/ui/fonts';


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
          {children}
        </Provider>
      </body>
    </html>
  );
}
