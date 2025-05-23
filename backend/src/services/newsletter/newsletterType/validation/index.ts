import { z } from "zod";

export const newsletterTypeSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  user: z.object({
    id: z.string(), // adjust based on your actual type
  }),
});
