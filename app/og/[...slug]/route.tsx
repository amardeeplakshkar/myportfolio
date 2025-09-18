import { blog } from '@/lib/source';
import { notFound } from 'next/navigation';
import { generateOGImage } from './generate';

export const revalidate = false;

export async function GET(
  _req: Request,
  { params }: any,
) {
  const { slug } = await params;
  const page = blog.getPage(slug.slice(0, -1));
  if (!page) notFound();

  return generateOGImage({
    title: page.data.title,
    description: page.data.description,
  });
}

export function generateStaticParams(): {
  slug: string[];
}[] {
  return blog.generateParams().map((page) => ({
    ...page,
    slug: [...page.slug, 'image.webp'],
  }));
}