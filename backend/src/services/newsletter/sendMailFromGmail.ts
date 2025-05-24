import nodemailer from "nodemailer";
import dotenv from 'dotenv';
import { addFailedMail } from './failedEmails';
import type { EmailOptions, EmailResult, GmailSMTPConfig } from "./types"

dotenv.config();

const {
  SMTP_HOST,
  SMTP_PORT,
  SMTP_SECURE,
  SMTP_FROM,
  SMTP_PASSWORD
} = process.env;

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: Number(SMTP_PORT),
  secure: SMTP_SECURE === 'true',
  auth: {
    user: SMTP_FROM,
    pass: SMTP_PASSWORD
  },
  logger: true,
  debug: true
} as GmailSMTPConfig);


export async function sendMailFromGmail({ bcc, subject, body }: EmailOptions) : Promise<EmailResult> {
  try {
    await transporter.sendMail({
      from: SMTP_FROM,
      bcc,
      subject,
      html: body,
      headers: {
        'X-Mailer': 'NodeMailer',
        'X-Priority': '3',
      }
    });

    return { success: true, message: 'Email sent successfully' };

  } catch (error: any) {
    addFailedMail({
      from: SMTP_FROM,
      bcc,
      subject,
      body,
      error: error.message,
      date: new Date()
    });
    return { success: false, message: 'Failed to send email', error: error.message };
  }
}
