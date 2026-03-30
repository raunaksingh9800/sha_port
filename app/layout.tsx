import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from '@vercel/analytics/next';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shalini - Portfolio",
  description:
    "Portfolio of Shalini — developer focused on systems, web engineering, embedded projects, and performance-driven software. Explore projects, technical experiments, and real-world builds.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="title" content="Shalini - Portfolio" />
        <meta
          name="description"
          content="Portfolio of Shalini — developer focused on systems, web engineering, embedded projects, and performance-driven software. Explore projects, technical experiments, and real-world builds."
        />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://sha-port.vercel.app" />
        <meta property="og:title" content="Shalini - Portfolio" />
        <meta
          property="og:description"
          content="Portfolio of Shalini — developer focused on systems, web engineering, embedded projects, and performance-driven software. Explore projects, technical experiments, and real-world builds."
        />
        <meta
          property="og:image"
          content="/main.jpeg"
        />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://sha-port.vercel.app" />
        <meta property="twitter:title" content="Shalini - Portfolio" />
        <meta
          property="twitter:description"
          content="Portfolio of Shalini — developer focused on systems, web engineering, embedded projects, and performance-driven software. Explore projects, technical experiments, and real-world builds."
        />
        <meta
          property="twitter:image"
          content="/main.jpeg"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
         <Analytics />
      </body>
    </html>
  );
}
