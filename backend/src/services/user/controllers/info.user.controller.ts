import { NextFunction, Request, Response } from "express";
import { response } from "../../../response-config/response";
import { getUsersInfoRepo } from "../repository/info.user.repository";

export const getUsersInfo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await getUsersInfoRepo({ id: req.user.id });

    response.ER200(res, user, "User retrieved successfully");
  } catch (error) {
    console.error("Error fetching user:", error);
    next(error);
  }
};
