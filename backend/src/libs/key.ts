import { randomBytes } from "crypto";
export const generateApiKey = () =>
  "newsletter_pub_" + randomBytes(32).toString("hex");
