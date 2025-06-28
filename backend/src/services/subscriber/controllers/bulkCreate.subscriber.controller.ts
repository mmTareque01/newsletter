import { NextFunction, Request, Response } from "express";
import { prisma } from "../../../connection";
import { response } from "../../../response-config/response";
import { createManySubscribersRepo } from "../repository/createMany.subscriber.repository";

interface BulkSubscriber {
  email: string;
  name?: string;
  phone?: string;
}

export const createBulkSubscriber = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  // Explicitly declare return type as Promise<void>
  try {
    // Check if file was uploaded
    if (!req.file) {
      response.ER400(res, "No file uploaded", "File is required");
      return;
    }

    // Check file type
    if (req.file.mimetype !== "application/json") {
      response.ER400(res, "Only JSON files are allowed", "Invalid file type");
      return;
    }

    let subscribers: BulkSubscriber[];

    try {
      // Parse JSON file
      subscribers = JSON.parse(req.file.buffer.toString());
     
      // Validate it's an array
      if (!Array.isArray(subscribers)) {
        response.ER400(
          res,
          "JSON file should contain an array of subscribers",
          "Invalid JSON format"
        );
        return;
      }

      // Validate each subscriber has required fields
      const invalidSubscribers = subscribers.filter(
        (sub) => !sub.email || typeof sub.email !== "string"
      );

      if (invalidSubscribers.length > 0) {
        response.ER400(
          res,
          `${invalidSubscribers.length} subscribers are missing required email field`,
          "Invalid subscriber data"
        );
        return;
      }
    } catch (parseError) {
      response.ER400(res, "Invalid JSON file format", "Invalid JSON format");
      return;
    }

    // Prepare data for repository
    const subscriberData = subscribers.map((sub) => ({
      email: sub.email,
      name: sub?.name,
      phone: sub?.phone,
      userId: req.user.id,
      newsletterTypeId: req.body.newsletterTypeId,
    }));


    //  response.ER400(
    //     res,
    //     "JSON file should contain an array of subscribers",
    //     subscriberData
    //   );

    // Create subscribers in bulk
    const createdSubscribers = await createManySubscribersRepo(subscriberData);

    response.ER201(
      res,
      {
        totalReceived: subscribers.length,
        totalCreated: createdSubscribers.length,
        createdSubscribers: createdSubscribers.map((sub) => ({
          email: sub.email,
          name: sub.name,
          phone: sub.phone,
        })),
      },
      `Successfully created ${createdSubscribers.length} subscribers`
    );
  } catch (error) {
    next(error);
  }
};
