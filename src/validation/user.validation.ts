

import { z } from "zod";

const statusEnum = z.enum(["ACTIVE", "INACTIVE", "UNSUBSCRIBED"]);

const emailField = z.string().email();
const passwordField = z.string();

const baseAuthSchema = z.object({
  email: emailField,
  password: passwordField,
});

export const loginSchema = baseAuthSchema;

export const registerSchema = baseAuthSchema.extend({
  confirmPassword: z.string(),
  firstName: z.string(),
  lastName: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"], // This makes the error appear on the confirmPassword field
});