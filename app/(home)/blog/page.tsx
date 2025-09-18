import Link from 'next/link';
import { blog } from '@/lib/source';

export default function Home() {
  const posts = blog.getPages();

  return (
    <main className="grow container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Latest Blog Posts</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => {
          const image = {
            url: ['/og', ...[post.slugs.join('/')], 'image.webp']!.join('/'),
          };
          return (
            <Link
              key={post.url}
              href={post.url}
              className="block bg-fd-secondary rounded-lg shadow-md overflow-hidden p-4"
            >
              <img className='rounded-xl mb-4' src={image.url} alt="" />
              <h2 className="text-xl font-semibold mb-2 line-clamp-2">{post.data.title}</h2>
              <p className='text-sm text-muted-foreground line-clamp-2'>{post.data.description}</p>
            </Link>
          )
        })}
      </div>
    </main>
  );
}