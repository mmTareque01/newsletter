import { ResponseConfig } from "./responseConfig";

export const response = new ResponseConfig(
  {
    appName: "NewsletterApp",
    version: process.env.VERSION || "1.0.0",
  },
  //   {
  //     subscribers: "/api/subscribers",
  //     // Add other relevant links
  //   },
  process.env.BASE_URL || "http://localhost:3000"
);
