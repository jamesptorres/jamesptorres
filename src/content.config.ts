import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  // Files starting with "_" are ignored.
  loader: glob({ base: './src/content/blog', pattern: '**/[^_]*.md' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      tags: z.array(z.string()).default([]),
      draft: z.boolean().default(false),
      heroImage: image().optional(),
      heroAlt: z.string().optional(),
      // Optional video for link previews (og:video). Direct file URL (mp4/webm) or a path under public/.
      video: z
        .object({
          url: z.string(),
          type: z.string().default('video/mp4'),
          width: z.number().default(1280),
          height: z.number().default(720),
        })
        .optional(),
    }),
});

export const collections = { blog };
