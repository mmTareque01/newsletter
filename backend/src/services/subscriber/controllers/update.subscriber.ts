import { Request, Response } from "express";
import { prisma } from "../../../connection";
import { response } from "../../../response-config/response";
import { updateSubscriberRepo } from "../repository/update.subscriber.repository";

export const updateSubscriber = async (req: Request, res: Response) => {
  try {
    // const page = parseInt(req.query.page as string) || 1;
    // const limit = parseInt(req.query.limit as string) || 10;
    // const skip = (page - 1) * limit;

    const updatedSubscriber = await updateSubscriberRepo(req.params.id, {
      status: req.body.status.toUpperCase(),
    });

    response.ER200(res, updatedSubscriber, "Subscriber updated successfully");
  } catch (error) {
    console.error("Error fetching subscribers:", error);
    response.ER500(res, "Database operation failed");
  }
};
