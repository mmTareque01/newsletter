// middlewares/authMiddleware.ts
import { Request, Response, NextFunction } from "express";
import { CustomError } from "../others/errors";
import { verifyAccessToken } from "../others/tokenService";

// export const authenticate = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const authHeader = req.headers["authorization"];
//   const token = authHeader?.startsWith("Bearer ")
//     ? authHeader.split(" ")[1]
//     : null;

//   try {
//     const validatedUser = verifyAccessToken(token || "");

//     if (!validatedUser) {
//       next(new CustomError("ER401", "Unauthorized user"));
//     } else {
//       req.user = validatedUser;
//     }

//     next();
//   } catch (error) {
//     next(error);
//   }
// };

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : null;

  try {
    const validatedUser = verifyAccessToken(token || "");

    if (!validatedUser) {
      return next(new CustomError("ER401", "Unauthorized user"));
    }

    req.user = validatedUser;
    next();
  } catch (error) {
    next(error);
  }
};
