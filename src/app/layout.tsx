import type { Metadata, Viewport } from "next";
import { Geist_Mono, Inter, Poppins } from "next/font/google";
import { ChatAssistant } from "@/components/chat-assistant";
import "./globals.css";

/** Display face — headlines and anything that should read as editorial. */
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
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
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable} ${geistMono.variable}`}>
      <body className="antialiased">
        {children}
        <ChatAssistant />
      </body>
    </html>
  );
}
