import { defineCollection, z } from 'astro:content';

const timelineCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.string(),
    type: z.enum(['pr', 'paper', 'poster', 'presentation', 'project']),
    description: z.string(),
    link: z.string().url(),
    tags: z.array(z.string()),
    featured: z.boolean().default(false),
  }),
});

const awardsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(), // e.g., "Best Mini-Golf in Pittsburgh"
    category: z.string(), // e.g., "entertainment", "food", "drinks", "coffee"
    winner: z.string(), // Business name
    location: z.string(), // Address or neighborhood
    year: z.number(), // Year of award
    tags: z.array(z.string()),
    featured: z.boolean().default(false),
  }),
});

export const collections = {
  timeline: timelineCollection,
  awards: awardsCollection,
};
