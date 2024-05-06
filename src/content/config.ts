import { defineCollection, z } from "astro:content"

const blog = defineCollection({
  // Type-check frontmatter using a schema
  schema: z.object({
    description: z.string(),
    heroImage: z.string().optional(),
    // Transform string to Date object
    pubDate: z.coerce.date(),
    title: z.string(),
    updatedDate: z.coerce.date().optional(),
  }),
  type: "content",
})

const tweet = defineCollection({
  schema: z.object({
    date: z.string(),
    id: z.string(),
    images: z.string().array(),
    name: z.string(),
    quotedTweet: z.string().optional(),
    tweet: z.string(),
    userId: z.string(),
    userImage: z.string(),
  }),
  type: "data"
})

const urlData = defineCollection({
  schema: z.object({
    description: z.string(),
    image: z.string(),
    title: z.string(),
    type: z.union([z.literal("summary"), z.literal("summary_large_image")]),
  }),
  type: "data"
})

export const collections = { blog, tweet, urlData }
