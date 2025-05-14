import { NextFunction, Request, Response } from "express";
import { prisma } from "../../../connection";
import { response } from "../../../response-config/response";
import { createSubscriberRepo } from "../repository/create";

export const createSubscriber = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, name, phone } = req.body;

    // Create new subscriber
    const newSubscriber = await createSubscriberRepo({ email, name, phone });

    // Return success response
    response.ER201(res, newSubscriber, "Subscriber created successfully");
  } catch (error) {
    next(error)
  }
};
