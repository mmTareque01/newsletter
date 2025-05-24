import { NextFunction, Request, Response } from "express";
import { createNewsletterTypeRepo } from "../repository/create.type.repo";
import { generateApiKey } from "../../../libs/key";
import { response } from "../../../response-config/response";


export const createNewsletterType = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, description } = req.body;

    // Create new subscriber
    const newType = await createNewsletterTypeRepo({
      title,
      description,
      userId: req.user.id,
      key: generateApiKey(),
    });

    response.ER201(res, newType, "Newsletter type created successfully");
  } catch (error) {
    next(error);
  }
};
