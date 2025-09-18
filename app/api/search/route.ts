import { blog } from '@/lib/source';
import { createFromSource } from 'fumadocs-core/search/server';

export const { GET } = createFromSource(blog, {
  language: 'english',
});