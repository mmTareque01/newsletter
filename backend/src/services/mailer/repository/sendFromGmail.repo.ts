import nodemailer from "nodemailer";
import dotenv from "dotenv";
import {
  GmailSMTPConfig,
  EmailOptions,
  EmailResult,
  FailedMailEntry,
} from "../types";
import { addFailedMail } from "../helper/failedEmails";
import fs from "fs";
import path from "path";
import { CustomError } from "../../../libs/errors";

dotenv.config();

const {
  SMTP_GMAIL_HOST,
  SMTP_GMAIL_PORT,
  SMTP_GMAIL_SECURE,
  SMTP_GMAIL_FROM,
  SMTP_GMAIL_PASSWORD,
} = process.env;

const transporter = nodemailer.createTransport({
  host: SMTP_GMAIL_HOST,
  port: Number(SMTP_GMAIL_PORT),
  secure: SMTP_GMAIL_SECURE === "true",
  auth: {
    user: SMTP_GMAIL_FROM,
    pass: SMTP_GMAIL_PASSWORD,
  },
  logger: true,
  debug: true,
} as GmailSMTPConfig);

export async function sendFromGmailRepo({
  bcc,
  subject,
  body,
}: EmailOptions): Promise<EmailResult> {
  try {
    const templatePath = path.join(__dirname, "../templates/invite.html");
    let htmlTemplate = fs.readFileSync(templatePath, "utf-8");

    htmlTemplate = htmlTemplate.replace("{{messageBody}}", body);
    // .replace("{{ctaLink}}", "https://yourwebsite.com/news")
    // .replace("{{ctaText}}", "Read More");

    console.log({ bcc, subject, body });

    await transporter.sendMail({
      from: SMTP_GMAIL_FROM,
      bcc,
      subject,
      html: htmlTemplate,
      headers: {
        "X-Mailer": "NodeMailer",
        "X-Priority": "3",
      },
    });

    return { success: true, message: "Email sent successfully" };
  } catch (error: any) {
    addFailedMail({
      from: SMTP_GMAIL_FROM,
      bcc,
      subject,
      body,
      error: error.message,
      date: new Date(),
    });
    throw new CustomError("ER500", 'Failed to send email', error.message);
    // return {
    //   success: false,
    //   message: "Failed to send email",
    //   error: error.message,
    // };
  }
}
