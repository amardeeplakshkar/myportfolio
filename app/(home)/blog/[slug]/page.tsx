import { notFound } from 'next/navigation';
import Link from 'next/link';
import { InlineTOC } from 'fumadocs-ui/components/inline-toc';
import defaultMdxComponents from 'fumadocs-ui/mdx';
import { blog } from '@/lib/source';
import ShareButton from '@/components/ShareButton';
import { DocsPage } from 'fumadocs-ui/page';
import { getPageTreePeers } from 'fumadocs-core/server';
import { Card, Cards } from 'fumadocs-ui/components/card';
import { Card as UICard } from '@/components/ui/card';
import { createMetadata } from '@/lib/metadata';
import { Metadata } from 'next';

export default async function Page(props: {
    params: Promise<{ slug: string }>;
}) {
    const params = await props.params;
    const page = blog.getPage([params.slug]);

    if (!page) notFound();
    const Mdx = page.data.body;
    const { toc, lastModified } = page.data;

    return (
        <>
            <div className="mx-auto w-full max-w-fd-container rounded-xl mt-12 px-4 py-12 md:px-8" style={{
                backgroundColor: "black",
                backgroundImage:
                    "linear-gradient(140deg, rgba(152, 27, 248, 0.3), transparent 50%), " +
                    "linear-gradient(to left top, rgba(89, 13, 242, 0.8), transparent 50%), " +
                    "radial-gradient(circle at 100% 100%, rgb(163, 163, 255), rgb(61, 61, 143) 17%, rgba(61, 61, 143, 0.5) 20%, transparent)",
                backgroundBlendMode: "difference, difference, normal",
            }}>
                <h1 className="mb-2 text-3xl font-bold text-white">{page.data.title}</h1>
                <p className="mb-4 text-white/80">{page.data.description}</p>
                <Link className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-fd-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fd-ring disabled:pointer-events-none disabled:opacity-50 border bg-fd-secondary text-fd-secondary-foreground hover:bg-fd-accent hover:text-fd-accent-foreground h-9 px-3" href="/blog">Back</Link>
            </div>
            <article className="flex flex-col mx-auto w-full max-w-fd-container py-8 lg:flex-row">
                <div className="prose min-w-0 flex-1 p-4">
                    <InlineTOC items={page.data.toc} />
                    <Mdx components={defaultMdxComponents} />
                    {page.data ? <DocsCategory url={page.url} /> : null}
                </div>
                <UICard className="flex flex-col gap-4 p-4 text-sm lg:w-[250px] h-min">
                    <div className="flex md:justify-normal justify-between gap-4 md:flex-col">
                        <div>
                            <p className="mb-1 text-fd-muted-foreground">Written by</p>
                            <p className="font-medium">{page.data.author}</p>
                        </div>
                        <div>
                            <p className="md:w-min w-1/2 mb-1 text-sm text-fd-muted-foreground">At</p>
                            <p className="font-medium">
                                {new Date(page.data.date).toDateString()}
                            </p>
                        </div>
                    </div>
                    <ShareButton url={"https://amardeep.space" + page.url} />
                </UICard>

            </article>
        </>
    );
}

function DocsCategory({ url }: { url: string }) {
    return (
        <Cards>
            {getPageTreePeers(blog.pageTree, url).map((peer) => (
                <Card key={peer.url} title={peer.name} href={peer.url}>
                    {(peer?.description as  string).length > 100
                        ? (peer?.description as  string).slice(0, 100) + "..."
                        : peer.description}
                </Card>
            ))}
        </Cards>
    );
}

export async function generateMetadata(
    props: any,
): Promise<Metadata> {
    const params = await props.params;
    const page = blog.getPage([params.slug]);

    if (!page)
        return createMetadata({
            title: 'Not Found',
        });

    const description =
        page.data.description ?? 'The blog by Amardeep Lakshkar';

    const image = {
        url: ['/og', ...[params.slug], 'image.webp']!.join('/'),
        width: 1200,
        height: 630,
    };

    return createMetadata({
        title: page.data.title,
        description,
        openGraph: {
            url: `/blog/${page!.slugs[0]}`,
            images: [image],
        },
        twitter: {
            images: [image],
        },
    });
}

export function generateStaticParams(): { slug: string }[] {
    return blog.getPages().map((page) => ({
        slug: page.slugs[0],
    }));
}