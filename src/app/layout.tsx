import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Rutik Narute — AI Software Engineer",
  description:
    "AI software engineer building useful LLM systems, full-stack products, data platforms, and thoughtful interfaces.",
  keywords: [
    "Rutik Narute",
    "AI Software Engineer",
    "Full Stack Engineer",
    "LLM Engineer",
    "React Developer",
    "Los Angeles",
  ],
  authors: [{ name: "Rutik Narute" }],
  openGraph: {
    title: "Rutik Narute — Make AI useful.",
    description: "Applied AI, full-stack systems, and product craft.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rutik Narute — AI Software Engineer",
    description: "Applied AI, full-stack systems, and product craft.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#070907",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
