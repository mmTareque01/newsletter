import { NextFunction, Request, Response } from "express";
import { response } from "../../../response-config/response";
import { sendFromGmailRepo } from "../repository/sendFromGmail.repo";

export const sendFromGmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { subject, body, to } = req.body;

    const sentEmail = await sendFromGmailRepo({ bcc: [to], subject, body });

    response.ER200(res, { info: sentEmail }, "Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
    next(error);
  }
};
