import { z } from "zod";


export const campaignInput = z.object({
  subject: z.string().min(1, "Subject is required"), // Mandatory
  message: z.string().min(1, "Message is required"), // Mandatory
  newsletterTypeId: z.string().uuid(), // Mandatory field for association
});
