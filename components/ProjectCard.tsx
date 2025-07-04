import React from 'react'
import { Card, CardContent } from './ui/card'
import Link from 'next/link'

type IconComponent = React.ComponentType<{ size: number, className?: string }>;

const ProjectCard = ({ image, title, description, url, techStack }: { image: string, title: string, description: string, url: string, techStack: IconComponent[] }) => {
    return (
        <Link target="_blank" rel="noopener noreferrer" href={url}>
            <Card className='group gap-2 p-2'>
                <CardContent className='p-2'>
                    <div
                        style={{
                            backgroundImage: `url(${image})`
                        }}
                        className='rounded-xl relative overflow-hidden aspect-square bg-cover bg-center bg-no-repeat'>
                        <div className="flex transition-all ease-in-out duration-500 absolute top-2 right-2 gap-2 bg-black/50 p-2 rounded-full backdrop-blur-md">
                            {techStack.map((IconComponent, index) => (
                                <IconComponent key={index} size={20} className="text-white" />
                            ))}
                        </div>
                    </div>
                    <div className='mt-2'>
                        <h3 className='text-lg font-semibold'>{title}</h3>
                        <p className='line-clamp-2 text-muted-foreground'>{description}</p>
                    </div>
                </CardContent>
            </Card>
        </Link>
    )
}

export default ProjectCard