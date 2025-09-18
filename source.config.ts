import { defineCollections, defineConfig, frontmatterSchema } from 'fumadocs-mdx/config';
import { z } from 'zod';
import { remarkInstall } from 'fumadocs-docgen';

export const blogPosts = defineCollections({
  type: 'doc',
  dir: 'content/blog',
  // add required frontmatter properties
  schema: frontmatterSchema.extend({
    author: z.string(),
    date: z.string().date().or(z.date()),
  }),
});

export default defineConfig({
  mdxOptions: {
    remarkPlugins: [remarkInstall],
  },
});