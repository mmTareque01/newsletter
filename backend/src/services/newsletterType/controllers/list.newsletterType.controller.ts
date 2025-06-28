import { NextFunction, Request, Response } from "express";
import { response } from "../../../response-config/response";
import { getAllTypesRepo } from "../repository/list.type.repo";

type BooleanMap = {
  [key: string]: boolean;
};

export const getNewsletterTypeList = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const pageNo = parseInt(req.query.pageNo as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 10;
    const query = (req.query.query as string) || "";

    const selectParams: BooleanMap = query
      .split(",")
      .map((key: string) => key.trim())
      .filter((key: string) => key) // Remove empty strings
      .reduce((acc: BooleanMap, key: string) => {
        acc[key] = true;
        return acc;
      }, {} as BooleanMap);

    console.log("Query Parameters:", selectParams);

    const { data, total, totalPages } = await getAllTypesRepo(
      req.user.id,
      pageNo,
      pageSize,
      selectParams

      // filterTypes.map(item=>({}))
    );

    response.ER200Paginate(
      res,
      data,
      total,
      pageNo,
      pageSize,
      totalPages,
      "Newsletter's type retrieved successfully"
    );
  } catch (error) {
    console.error("Error fetching newsletter type:", error);
    next(error);
  }
};
