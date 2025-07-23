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

export function CarouselPlugin() {
    const plugin = React.useRef(
        Autoplay({ delay: 2500, stopOnInteraction: false })
    )

    return (
        <div className="w-full">
            <h3 className="text-xl font-semibold mb-4">Blogs</h3>
            <Carousel
                plugins={[plugin.current]}
                className="w-full"
                opts={{
                    align: "start",
                    loop: true,
                }}
            >
                <CarouselContent>
                    {Array.from({ length: 5 }).map((_, index) => (
                        <CarouselItem key={index} className="basis-full">
                            <Card className="w-full">
                                <CardContent className="flex  items-center justify-center p-6">
                                    <span className="text-3xl font-semibold">{index + 1}</span>
                                </CardContent>
                            </Card>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="lg:flex hidden" />
                <CarouselNext className="lg:flex hidden" />
            </Carousel>
        </div>
    )
}
