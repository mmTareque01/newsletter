import { NextFunction, Request, Response } from "express";
import { response } from "../../../response-config/response";
import { getAllSubscribersRepo } from "../repository/list";

export const getAllSubscribers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const pageNo = parseInt(req.query.pageNo as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 10;

    const { data, total, totalPages } = await getAllSubscribersRepo(
      pageNo,
      pageSize
    );

    response.ER200Paginate(
      res,
      data,
      totalPages,
      pageNo,
      pageSize,
      "Subscribers retrieved successfully"
    );
  } catch (error) {
    console.error("Error fetching subscribers:", error);
    next(error);
  }
};
