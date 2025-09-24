import { NextFunction, Request, Response } from "express";
import { response } from "../../../response-config/response";
import { updateUsersInfoRepo } from "../repository/update.user.repository";

export const updateUsersInfo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await updateUsersInfoRepo({ id: req.user.id, ...req.body });

    response.ER200(res, user, "User updated successfully");
  } catch (error) {
    console.error("Error updating user:", error);
    next(error);
  }
};
