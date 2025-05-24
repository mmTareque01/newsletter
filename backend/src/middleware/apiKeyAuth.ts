// middlewares/authMiddleware.ts
import { Request, Response, NextFunction } from "express";
import { CustomError } from "../libs/errors";
import { prisma } from "../connection";

export const apiKeyAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const apiKey = req.headers["x-api-key"];

  if (!apiKey) {
    return next(new CustomError("ER401", "Unauthorized user"));
  } else {
  }

  const newsletterType = await prisma.newsletterType.findFirst({
    where: {
      key: apiKey as string,
    },
    select: {
      id: true,
      user: true,
    },
  });

//   console.log({ newsletterType });

  if (!newsletterType) {
    return next(new CustomError("ER401", "Unauthorized user"));
  } else {
  }

  req.user = newsletterType.user as UserType;
  req.info = {
    newsletterTypeId: newsletterType.id,
  };

  //   req.user = {
  //     id: newsletterType.user.id,
  //     newsletterTypeId: newsletterType.id,}
  next();
};
