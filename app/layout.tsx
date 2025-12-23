import { Providers } from "@/core/components/providers/providers";
import { clientEnv } from "@/core/env/client";
import type { Metadata } from "next";
import { Dancing_Script, Geist, Geist_Mono } from "next/font/google";
import { PropsWithChildren } from "react";

import "@vidstack/react/player/styles/base.css";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" });
const dancingScript = Dancing_Script({ subsets: ["latin"], variable: "--font-dancing-script" });

export const metadata: Metadata = {
  metadataBase: new URL(clientEnv.NEXT_PUBLIC_SITE_URL),
  title: {
    default: "Terry Henrard | AI Engineer & Full-Stack Developer",
    template: "%s | Terry Henrard",
  },
  description:
    "AI Engineer & Full-Stack Developer specialized in building intelligent web applications with AI, Next.js, React, and TypeScript. Discover my portfolio and projects.",
  keywords: [
    "AI Engineer",
    "Artificial Intelligence",
    "Full-Stack Developer",
    "Web Developer",
    "Next.js",
    "React",
    "TypeScript",
    "Machine Learning",
    "Portfolio",
    "Terry Henrard",
  ],
  authors: [{ name: "Terry Henrard" }],
  creator: "Terry Henrard",
  publisher: "Terry Henrard",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Terry Henrard",
    title: "Terry Henrard | AI Engineer & Full-Stack Developer",
    description:
      "AI Engineer & Full-Stack Developer specialized in building intelligent web applications with AI, Next.js, React, and TypeScript. Discover my portfolio and projects.",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Terry Henrard - AI Engineer & Full-Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Terry Henrard | AI Engineer & Full-Stack Developer",
    description:
      "AI Engineer & Full-Stack Developer specialized in building intelligent web applications with AI, Next.js, React, and TypeScript.",
    images: ["/images/marketing/hero.png"],
    creator: "@TerryHenrard",
  },
  alternates: {
    canonical: "/",
  },
  appleWebApp: {
    title: "Terry Henrard",
  },
};

export default function RootLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geist.className} ${geistMono.variable} ${dancingScript.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
