import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { RootProvider } from "fumadocs-ui/provider/next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Limitly - Free Rate Limiting SDK",
    template: "%s | Limitly",
  },
  description: "The best TypeScript-first rate limiting SDK for Node.js and browsers. Free, fast, and feature-rich with Redis-backed distributed rate limiting. Fully type-safe with excellent TypeScript support.",
  keywords: [
    "rate limiting",
    "rate limit",
    "typescript",
    "nodejs",
    "sdk",
    "redis",
    "token bucket",
    "distributed",
    "free",
    "api rate limiting",
    "express rate limit",
    "nextjs rate limit",
  ],
  authors: [{ name: "Emmanuel Taiwo" }],
  creator: "Emmanuel Taiwo",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://limitly.xyz",
    title: "Limitly - Free Rate Limiting SDK",
    description: "The best TypeScript-first rate limiting SDK. Free, fast, and fully type-safe.",
    siteName: "Limitly",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Limitly - Free Rate Limiting SDK",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Limitly - Free Rate Limiting SDK",
    description: "The best TypeScript-first rate limiting SDK. Free, fast, and fully type-safe.",
    creator: "@ez0xai",
    images: ["/og.png"],
  },
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
  metadataBase: new URL("https://limitly.xyz"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <RootProvider 
          theme={{ 
            forcedTheme: 'dark', 
            enableSystem: false,
            defaultTheme: 'dark' 
          }}
        >
          {children}
        </RootProvider>
        <Analytics />
      </body>
    </html>
  );
}
