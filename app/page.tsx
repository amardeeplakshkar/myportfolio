import { Button } from '@/components/ui/button'
import React from 'react'
import { Download, MessageCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CarouselPlugin } from '@/components/Carousel'
import ProjectCard from '@/components/ProjectCard'
import { SKILLS, CONTACT, PROJECTS } from '@/constants'
import Footer from '@/components/Footer'
import Link from 'next/link'

const MainPage = () => {
  return (
    <div className='p-6 px-4 grid gap-14 max-w-4xl mx-auto'>
      <div className='grid gap-4 mt-8'>
        <h1 className='tracking-wide text-3xl font-semibold '>Amardeep Lakshkar</h1>
        <p className='text-muted-foreground'>
          A passionate full-stack developer and freelancer, dedicated to building innovative products and web applications while delivering high-quality, client-focused solutions.
        </p>
        <div className='flex items-center gap-2'>
          <Button><Download />Download CV</Button>
          <Button variant={"outline"}><MessageCircle />Chat With Me</Button>
        </div>
      </div>
      <section className='grid gap-4 md:grid-cols-2'>
        <Card className='gap-2'>
          <CardHeader>
            <CardTitle className='text-xl font-semibold' >Skills</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='flex flex-wrap gap-3'>
              {SKILLS.map((skill, i) => (
                <Badge variant={'secondary'} className=' p-1.5 px-2' key={i}>{skill}</Badge>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card className='gap-2'>
          <CardHeader>
            <CardTitle className='text-xl font-semibold' >Let&apos;s Contact</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='flex flex-wrap gap-3'>
              {CONTACT.map((contact, i) => (
                <Link className='cursor-pointer' target="_blank" rel="noopener noreferrer" href={contact.href} key={i}>
                  <Button variant={'secondary'}>
                    <contact.icon />
                  </Button>
                </Link>
              ))}
            </div>
            <div className='grid gap-2'>
              <div className='mt-3'>
                <h4 className=' font-semibold'>Email</h4>
                <Link target="_blank" rel="noopener noreferrer" href="mailto:amardeep.devs@gmail.com" className='text-muted-foreground cursor-pointer'>amardeep.devs@gmail.com</Link>
              </div>
              <div>
                <h4 className=' font-semibold'>Address</h4>
                <p className='text-muted-foreground'>Indore, India</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
      <CarouselPlugin />
      <section>
        <h2 className='text-xl font-semibold  mb-2'>Projects</h2>
        <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
          {PROJECTS.map((project, i) => (
            <ProjectCard key={i} {...project} />
          ))}
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default MainPage