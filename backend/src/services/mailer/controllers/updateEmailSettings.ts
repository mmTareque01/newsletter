import { NextFunction, Request, Response } from "express";
import { response } from "../../../response-config/response";
import { sendFromGmailRepo } from "../repository/sendFromGmail.repo";
import { addEmailRepo } from "../repository/addEmail.repo";

export const sendFromGmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let status = false;
     const { subject, body, to } = req.body;
  try {
 

    const sentEmail = await sendFromGmailRepo({ bcc: [to], subject, body });
    status = true;

    response.ER200(res, { info: sentEmail }, "Email sent successfully");

  } catch (error) {
    console.error("Error sending email:", error);
    next(error);
  }
  finally{
    await addEmailRepo({
      to,subject,body,userId: req.user?.id as string, status: status ? "SENT" : "FAILED"
    })
  }
};
