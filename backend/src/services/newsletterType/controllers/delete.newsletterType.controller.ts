import { NextFunction, Request, Response } from "express";
import { response } from "../../../response-config/response";
import { deleteTypeRepo } from "../repository/delete.type.repo";

export const deleteNewsletterType = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {

    const deletedType = await deleteTypeRepo(req.params.id);

    response.ER200(res, deletedType, "Newsletter type deleted successfully");
  } catch (error) {
    next(error);
  }
};
