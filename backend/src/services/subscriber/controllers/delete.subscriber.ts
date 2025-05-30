import { Request, Response } from "express";
import { prisma } from "../../../connection";
import { response } from "../../../response-config/response";
import { deleteSubscriberRepo } from "../repository/delete.subscriber.repository";

export const deleteSubscriber = async (req: Request, res: Response) => {
  try {
    // const page = parseInt(req.query.page as string) || 1;
    // const limit = parseInt(req.query.limit as string) || 10;
    // const skip = (page - 1) * limit;

    const updatedSubscriber = await deleteSubscriberRepo(req.params.id);

    response.ER200(res, updatedSubscriber, "Subscriber deleted successfully");
  } catch (error) {
    console.error("Error fetching subscribers:", error);
    response.ER500(res, "Request failed");
  }
};
