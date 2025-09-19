"use client"

import * as React from "react"
import Autoplay from "embla-carousel-autoplay"

import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Link from "next/link"

export function CarouselPlugin({ posts }: { posts: any }) {
    const plugin = React.useRef(
        Autoplay({ delay: 2500, stopOnInteraction: false })
    )

    return (
        <div className="w-full rounded-xl">
            <h3 className="text-xl font-semibold mb-4">Blogs</h3>
            <Carousel
                plugins={[plugin.current]}
                className="w-full  rounded-xl"
                opts={{
                    align: "start",
                    loop: true,
                }}
            >
                <CarouselContent className="max-w-[92dvw]">
                    {posts.map((post: any, index: number) => {
                        const image = {
                            url: ['/og', ...[post.slug], 'image.webp']!.join('/'),
                        };
                        return (
                            <CarouselItem key={index} className="basis-full">
                                <Link
                                    key={post.url}
                                    href={post.url}
                                    className="block w-full"
                                >
                                    <Card className="w-full h-full mx-2 md:mx-0">
                                        <CardContent className="flex items-center gap-2 p-3 md:p-4 overflow-hidden">
                                            <img className='rounded-lg hidden sm:flex h-[4rem]' src={image.url} alt="" />
                                            <div className="flex-1 min-w-0">
                                                <h2 className="text-lg md:text-xl  font-semibold mb-2 line-clamp-1">{post.title}</h2>
                                                <p className="text-xs md:text-sm   line-clamp-1">{post.description}</p>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Link>
                            </CarouselItem>
                        )
                    })}
                </CarouselContent>
                <CarouselPrevious className="lg:flex hidden" />
                <CarouselNext className="lg:flex hidden" />
            </Carousel>
        </div>
    )
}
