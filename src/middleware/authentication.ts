// middlewares/authMiddleware.ts
import { Request, Response, NextFunction } from "express";
import { authenticateUser } from "../others/JWT";
import { CustomError } from "../others/errors";

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // const token = req.headers.authorization;

  const authHeader = req.headers["authorization"];
  const token = authHeader?.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : null;

  const validatedUser = authenticateUser(token);

  if (!validatedUser) {
    next(new CustomError("ER401", "Unauthorized user"));
  }
  next();
};
