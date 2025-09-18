import type { Metadata } from 'next/types';

export function createMetadata(override: Metadata): Metadata {
  return {
    ...override,
    openGraph: {
      title: override.title ?? undefined,
      description: override.description ?? undefined,
      url: 'https://amardeep.space',
      images: '/og-image.png',
      siteName: 'Amardeep Lakshkar',
      ...override.openGraph,
    },
    icons: {
      icon: [
        { url: "/favicon.svg", type: "image/svg+xml" },
      ],
    },
    metadataBase: new URL("https://amardeep.space"),
    twitter: {
      card: 'summary_large_image',
      creator: '@amardeepdevs',
      title: override.title ?? undefined,
      description: override.description ?? undefined,
      images: '/og-image.png',
      ...override.twitter,
    },
    alternates: {
      ...override.alternates,
    },
  };
}

export const baseUrl =
  process.env.NODE_ENV === 'development' ||
    !process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? new URL('http://localhost:3000')
    : new URL(`https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`);