import { NextFunction, Request, Response } from "express";
import { response } from "../../../../response-config/response";
import { updateTypesRepo } from "../repository/update.type.repo";

export const updateNewsletterType = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, description } = req.body;

    // Create new subscriber
    const updatedType = await updateTypesRepo(req.params.id, {
      title,
      description,
    });

    response.ER200(res, updatedType, "Newsletter type created successfully");
  } catch (error) {
    next(error);
  }
};
