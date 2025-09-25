import { z } from "zod";

export const emailSettingsValidation = z.object({
  smtpHost: z.string().min(1, "SMTP host is required"), // Mandatory
  smtpPort: z.number().min(1, "SMTP port is required"),
  smtpUser: z.string().min(1, "SMTP user is required"),
  smtpPassword: z.string().min(1, "SMTP password is required"),
  fromEmail: z.string().min(1, "From email is required"),
  fromName: z.string().optional(),
  useTLS: z.boolean().optional(),
});
