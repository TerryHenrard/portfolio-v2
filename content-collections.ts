import { defineCollection, defineConfig } from "@content-collections/core";
import { z } from "zod";

const projectSchema = z.object({
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
  category: z.string().optional(),
  readingTimeMinutes: z.number().optional(),
  content: z.string(),
});

export type Project = z.infer<typeof projectSchema>;

const projects = defineCollection({
  name: "projects",
  directory: "features/portfolio/content",
  include: "**/*.mdx",
  schema: projectSchema,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  transform: ({ content, ...post }) => {
    return post;
  },
});

export default defineConfig({
  collections: [projects],
});
