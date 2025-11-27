import { defineCollection, z } from 'astro:content';
import { getAllowedTags } from '../utils/tags';

const allowedTags = getAllowedTags();

const tagsSchema = z.array(z.string()).refine(
  (tags) => tags.every((tag) => allowedTags.includes(tag)),
  (tags) => ({
    message: `Invalid tags: ${tags.filter((t) => !allowedTags.includes(t)).join(', ')}. Add them to src/data/tags.yaml.`,
  })
);

const timelineCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.string(),
    type: z.enum(['pr', 'paper', 'poster', 'presentation', 'project']),
    description: z.string(),
    link: z.string().url(),
    tags: tagsSchema,
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
    tags: tagsSchema,
    featured: z.boolean().default(false),
  }),
});

const problemsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(), // The question, e.g., "How can we make workflows reproducible?"
    description: z.string(), // 1-2 sentence hook
    tags: tagsSchema, // Links to timeline entries via shared tags
    started: z.string(), // YYYY-MM when you started thinking about it
    featured: z.boolean().default(false),
  }),
});

const cocktailMenusCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(), // e.g., "Christina's 31st - Spider Themed"
    date: z.string(), // YYYY-MM or YYYY-MM-DD
    occasion: z.string(), // e.g., "Birthday", "Halloween Party"
    tags: tagsSchema,
  }),
});

export const collections = {
  timeline: timelineCollection,
  awards: awardsCollection,
  problems: problemsCollection,
  'cocktail-menus': cocktailMenusCollection,
};
