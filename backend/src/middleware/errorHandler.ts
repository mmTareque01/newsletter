// middlewares/errorHandler.ts
import { Request, Response, NextFunction } from "express";
import { response } from "../response-config/response";
import { CustomError } from "../libs/errors";

//  error: this.name,
//       statusCode: this.statusCode,
//       message: this.message,
//       details: this.details,
//       stack: process.env.NODE_ENV === "development" ? this.stack : undefined,

export function errorHandler(
  error: {
    statusCode: string;
    message: string;
  },
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error("Error:", error);

  // const status = error.status || 500;
  const message = error.message || "Internal Server Error";

  if (error instanceof CustomError && error.statusCode in response) {
    if (error.statusCode === "ER401") {
      response.setRefreshToken(res, null, 0);
    }
    response[error.statusCode](res, error.details, error.message);
  } else {
    response.ER500(res, message);
  }

  // res.status(status).json({ error: message });
}
