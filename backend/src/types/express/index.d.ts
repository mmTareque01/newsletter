// types/express/index.d.ts
import { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user: UserType; // Adjust this type based on your authenticateUser() return
    }
  }
}

export {};
