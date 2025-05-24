import { z } from "zod";

const statusEnum = z.enum(["ACTIVE", "INACTIVE", "UNSUBSCRIBED"]);

export const createSubscriberSchema = z.object({
  email: z.string().email(), // Only mandatory field
  name: z.string().optional(), // Optional
  phone: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/)
    .optional(), // Optional with validation
  status: statusEnum.optional().default("ACTIVE"), // Optional with default
  // newsletterTypeId: z.string().uuid(), // Mandatory field for association
  // userId: z.string().uuid(), // Mandatory field for association
});

export const updateSubscriberSchema = z
  .object({
    email: z.string().email().optional(), // Optional in updates
    name: z.string().optional(),
    phone: z
      .string()
      .regex(/^\+?[1-9]\d{1,14}$/)
      .optional(),
    status: statusEnum.optional(),
  })
  .partial(); // Makes all fields optional
