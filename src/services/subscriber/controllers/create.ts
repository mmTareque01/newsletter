import { NextFunction, Request, Response } from "express";
import { prisma } from "../../../connection";
import { response } from "../../../response-config/response";
import { createSubscriberRepo } from "../repository/create.subscriber.repository";

export const createSubscriber = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, name, phone } = req.body;

    // Create new subscriber
    const newSubscriber = await createSubscriberRepo({ email, name, phone });

    response.ER201(
      res,
      {
        email: newSubscriber.email,
        name: newSubscriber.name,
        phone: newSubscriber.phone,
      },
      "Subscriber created successfully"
    );
  } catch (error) {
    next(error);
  }
};
