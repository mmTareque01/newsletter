import { NextFunction, Request, Response } from "express";
import { response } from "../../../response-config/response";
import { sendFromGmailRepo } from "../repository/sendFromGmail.repo";
import { addEmailRepo } from "../repository/addEmail.repo";
import { getEmailSettingsRepo } from "../repository/getEmailSettings.repo";
import { createEmailSettingsRepo } from "../repository/createEmailSettings.repo";

export const createEmailSettings = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.user.id;
  try {
    const emailSettings = await createEmailSettingsRepo({ userId, ...req.body });

    response.ER201(res, emailSettings, "Email settings created successfully");
  } catch (error) {
    console.error("Error creating email settings:", error);
    next(error);
  }
};
