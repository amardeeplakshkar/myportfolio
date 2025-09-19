import { AmardeepLogo } from '@/components/Icons';
import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { BookIcon, IdCard } from 'lucide-react';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: <>
        <AmardeepLogo size={35} />
        <span className='line-clamp-1'>
        Amardeep Lakshkar
        </span>
      </>,
    },
    links: [
      {
        icon: <IdCard />,
        text: 'Portfolio',
        url: '/',
        secondary: false,
      },
      {
        icon: <BookIcon />,
        text: 'Blog',
        url: '/blog',
        active: 'nested-url',
        secondary: false,
      },
    ]
  };
}