import { z } from "zod";


export const mailerValidation = z.object({
  subject: z.string().min(1, "Subject is required"), // Mandatory
  body: z.string().min(1, "Body is required"), // Mandatory
  to: z.string().email(), // Mandatory field for association
});
