import {
  ImageResponse,
  type ImageResponseOptions,
} from '@takumi-rs/image-response';
import type { ReactNode } from 'react';
import fs from 'node:fs/promises';
import { AmardeepLogo } from '@/components/Icons';

export interface GenerateProps {
  title: ReactNode;
  description?: ReactNode;
}


export async function generateOGImage(
  options: GenerateProps & Partial<ImageResponseOptions>,
): Promise<ImageResponse> {
  const { title, description, ...rest } = options;

  return new ImageResponse(
    generate({
      title,
      description,
    }),
    {
      format: 'webp',
      width: 1200,
      height: 630,
      ...rest,
    },
  );
}

function generate({ title, description }: GenerateProps) {
  const siteName = 'Amardeep Lakshkar';
  const primaryTextColor = 'rgb(240,240,240)';
  const logo = (
    <AmardeepLogo color='' size={100} />
  );

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        color: 'white',
        backgroundColor: 'rgb(10,10,10)',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: '100%',
          padding: '4rem',
        }}
      >
        <p
          style={{
            fontWeight: 600,
            fontSize: '76px',
            overflow: 'hidden',
            lineClamp: 2
          }}
        >
          {title}
        </p>
        <p
          style={{
            fontSize: '48px',
            color: 'rgba(240,240,240,0.7)',
            overflow: 'hidden',
            lineClamp: 1
          }}
        >
          {description}
        </p>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '24px',
            marginTop: 'auto',
            color: primaryTextColor,
          }}
        >
          {logo}
          <p
            style={{
              fontSize: '46px',
              fontWeight: 600,
            }}
          >
            {siteName}
          </p>
        </div>
      </div>
    </div >
  );
}