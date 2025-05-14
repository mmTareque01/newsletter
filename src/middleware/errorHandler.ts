// middlewares/errorHandler.ts
import { Request, Response, NextFunction } from "express";
import { response } from "../response-config/response";
import { CustomError } from "../others/errors";

export function errorHandler(
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error("Error:", error);

  const status = error.status || 500;
  const message = error.message || "Internal Server Error";

  if (error instanceof CustomError && error.statusCode in response) {
    response[error.statusCode](res, error.details, error.message);
  }

  response.ER500(res, message);

  // res.status(status).json({ error: message });
}
