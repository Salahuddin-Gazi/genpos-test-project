import type { Metadata } from "next";
import "./globals.css";

import { Open_Sans } from 'next/font/google';

export const metadata: Metadata = {
  title: "Genpos",
  description: "Admin Dashboard",
};

const openSans = Open_Sans({
  subsets: ['latin'], // Choose subsets as needed
  weight: ['300', '400', '500', '600', '700', '800'], // Add the weights you need
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${openSans.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
