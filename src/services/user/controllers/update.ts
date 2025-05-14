import { Request, Response } from "express";
import { prisma } from "../../../connection";
import { response } from "../../../response-config/response";

export const updateSubscriber = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const [subscribers, total] = await Promise.all([
      prisma.subscriber.findMany({
        skip,
        take: limit,
      }),
      prisma.subscriber.count(),
    ]);

    response.ER200Paginate(
      res,
      subscribers,
      total,
      page,
      limit,
      "Subscribers retrieved successfully"
    );
  } catch (error) {
    console.error("Error fetching subscribers:", error);
    response.ER500(res, "Database operation failed");
  }
};
