import { GithubIcon, LinkedinIcon, TwitterIcon, InstagramIcon } from "lucide-react"
import { NextjsIcon, ReactIcon, TypescriptIcon, FramerMotionIcon, NpmIcon, InngestLogo, NeonDbIcon } from "@/components/Icons"
import {createOpenAI} from '@ai-sdk/openai'

export const SKILLS = [
    "React",
    "Next.js",
    "Tailwind CSS",
    "TypeScript",
    "JavaScript",
    "HTML",
    "CSS",
    "Vite",
  
    "Node.js",
    "Express.js",
    "MongoDB",
    "PostgreSQL",
    "Prisma",
    "Drizzle ORM",
  
    "Git",
    "GitHub",
  
    "JavaScript",
    "TypeScript",
    "PHP",
    "Python",
  ]
  
  
  export const CONTACT = [
    {
      name: "github",
      href: "https://github.com/amardeeplakshkar",
      icon: GithubIcon,
    },
    {
      name: "linkedin",
      href: "https://in.linkedin.com/in/amardeep-lakshkar-24a339244",
      icon: LinkedinIcon,
    },
    {
      name: "twitter",
      href: "https://x.com/AmardeepDevs",
      icon: TwitterIcon,
    },
    {
      name: "instagram",
      href: "https://instagram.com/amardeep.webdev",
      icon: InstagramIcon,
    },
  ]
  
  export const PROJECTS = [
    {
      image: "/media/bloom.png",
      title: "Bloom",
      description: "AI Powered Autonomous Coding Agent. Write code faster with Bloom.",
      url: "https://bloom.amardeep.space",
      techStack:[
        NextjsIcon,
        InngestLogo,
        NeonDbIcon,
        ReactIcon,
        TypescriptIcon,
      ]
    },
    {
      image: "/media/iris.png",
      title: "Iris",
      description: "A Multimodel AI Chatbot. with features like Artifacts, image generation, video transcription, text to speech, and more",
      url: "https://iris.amardeep.space",
      techStack:[
        NextjsIcon,
        NeonDbIcon,
        ReactIcon,
        TypescriptIcon,
      ]
    },
    {
      image: "/media/ogify.png",
      title: "Ogify",
      description: "OG Image Generator: Design eye-catching images for social media platforms with our intuitive editor",
      url: "https://ogify.amardeep.space",
      techStack:[
        ReactIcon,
        TypescriptIcon,
      ]
    },
    {
      image: "/media/velociui.png",
      title: "Veloci UI",
      description: "React Component Library for building modern UI",
      url: "https://velociui.amardeep.space",
      techStack:[
        NextjsIcon,
        ReactIcon,
        TypescriptIcon,
        FramerMotionIcon
      ]
    },
    {
      image: "/media/xenorai.png",
      title: "Xenorai",
      description: "AI Powered Chatbot with image generation, video generation, text to speech, and more",
      url: "https://xenorai.amardeep.space",
      techStack:[
        NextjsIcon,
        ReactIcon,
        TypescriptIcon,
      ]
    },
    {
      image: "/media/liveemoji.png",
      title: "Live Emoji",
      description: "Live Emoji : Animated Emoji Icon npm package",
      url: "https://liveemoji.amardeep.space",
      techStack:[
        NpmIcon,
        ReactIcon,
        TypescriptIcon,
      ]
    },
  ]