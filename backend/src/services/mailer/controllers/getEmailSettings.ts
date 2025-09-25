import { NextFunction, Request, Response } from "express";
import { response } from "../../../response-config/response";
import { sendFromGmailRepo } from "../repository/sendFromGmail.repo";
import { addEmailRepo } from "../repository/addEmail.repo";
import { getEmailSettingsRepo } from "../repository/getEmailSettings.repo";

export const getEmailSettings = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.user.id;
  try {
    const emailSettings = await getEmailSettingsRepo(userId);

    response.ER200(res, emailSettings, "Email settings retrieved successfully");
  } catch (error) {
    console.error("Error retrieving email settings:", error);
    next(error);
  }
};
