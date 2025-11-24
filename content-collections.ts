import { defineCollection, defineConfig } from "@content-collections/core";
import { z } from "zod";

const projects = defineCollection({
  name: "projects",
  directory: "features/portfolio/content",
  include: "**/*.mdx",
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    author: z.string(),
    createdAt: z
      .string()
      .refine((date) => !isNaN(Date.parse(date)), { message: "Invalid date format" }),
    updatedAt: z
      .string()
      .refine((date) => !isNaN(Date.parse(date)), { message: "Invalid date format" }),
    tags: z.array(z.string()).optional(),
    content: z.string(),
  }),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  transform: ({ content, ...post }) => {
    return post;
  },
});

export default defineConfig({
  collections: [projects],
});
