import { NextFunction, Request, Response } from "express";
import { response } from "../../../response-config/response";

export const sendNewsletter = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { subject, message, newsletterTypeId } = req.body;

    console.log({ newsletterTypeId });

    // const { data, total, totalPages } = await getAllSubscribersRepo(
    //   pageNo,
    //   pageSize,
    //   req.user.id,
    //   newsletterTypeId ? newsletterTypeId : null
    // );

    response.ER200(
      res,
      { subject, message, newsletterTypeId },
      "Newsletter sent successfully"
    );
  } catch (error) {
    console.error("Error fetching subscribers:", error);
    next(error);
  }
};
