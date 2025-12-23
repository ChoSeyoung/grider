import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://grider-kappa.vercel.app'),
  title: {
    default: "Grider - Free Photo Grid Maker | Create Beautiful Layouts",
    template: "%s | Grider",
  },
  description:
    "Create stunning photo grid layouts for free. Choose from multiple layouts (2x2, 3x2, 4x2), customize gaps, corners, and backgrounds. Download as PNG instantly. No signup required.",
  keywords: [
    "photo grid maker",
    "photo collage",
    "image grid generator",
    "photo layout editor",
    "free collage maker",
    "photo grid online",
    "사진 그리드",
    "사진 콜라주",
    "포토 그리드",
    "사진 레이아웃",
    "무료 콜라주",
  ],
  authors: [{ name: "Grider" }],
  creator: "Grider",
  publisher: "Grider",
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
    alternateLocale: "ko_KR",
    title: "Grider - Free Photo Grid Maker",
    description:
      "Create stunning photo grid layouts for free. Multiple layouts, customizable options, instant PNG download.",
    siteName: "Grider",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Grider - Photo Grid Maker",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Grider - Free Photo Grid Maker",
    description:
      "Create stunning photo grid layouts for free. Multiple layouts, customizable options, instant PNG download.",
    images: ["/og-image.png"],
  },
  verification: {
    google: "YOUR_GOOGLE_VERIFICATION_CODE",
  },
  alternates: {
    canonical: "/",
  },
  category: "Photography",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#1a1a2e",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="format-detection" content="telephone=no" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
