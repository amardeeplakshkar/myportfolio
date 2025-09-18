import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import MainProvider from "@/components/providers/MainProvider";

const poppins = Poppins({ subsets: ['latin'], variable: "--font-poppins", weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'] });

export const metadata: Metadata = {
  keywords: ['full-stack developer', 'freelancer', 'innovative products', 'web applications', 'client-focused solutions'],
  authors: [{ name: 'Amardeep Lakshkar' }],
  creator: 'Amardeep Lakshkar',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
  },
  openGraph: {
    title: "Amardeep Lakshkar",
    description: "A passionate full-stack developer and freelancer, dedicated to building innovative products and web applications while delivering high-quality, client-focused solutions.",
    type: "website",
    locale: "en_IN",
    siteName: "Amardeep Lakshkar",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Amardeep Lakshkar",
      },
    ],
    url: "https://amardeep.space",
  },
  metadataBase: new URL("https://amardeep.space"),
  twitter: {
    card: 'summary_large_image',
    creator: '@amardeepdevs',
    title: "Amardeep Lakshkar",
    description: "A passionate full-stack developer and freelancer, dedicated to building innovative products and web applications while delivering high-quality, client-focused solutions.",
    images: '/og-image.png',
  },
  title: "Amardeep Lakshkar",
  description: "A passionate full-stack developer and freelancer, dedicated to building innovative products and web applications while delivering high-quality, client-focused solutions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${poppins.variable} antialiased`}
      >
        <MainProvider>
          {children}
        </MainProvider>
      </body>
    </html>
  );
}
