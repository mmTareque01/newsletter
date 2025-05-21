import nodemailer from "nodemailer";
import dotenv from 'dotenv';
import { addFailedMail } from './failedEmails';

dotenv.config();

const {
  SMTP_HOST,
  SMTP_PORT,
  SMTP_SECURE,
  SMTP_FROM
} = process.env;

export interface EmailOptions {
  to: string[];
  subject: string;
  text: string;
}

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: Number(SMTP_PORT),
  secure: SMTP_SECURE === 'true',
  tls: { rejectUnauthorized: false }
});


export async function sendMail({ to, subject, text }: EmailOptions) {
  try {
    await transporter.sendMail({
      from: SMTP_FROM,
      to: to.join(', '), // multiple recipients
      subject,
      text
    });

  } catch (error: any) {
    addFailedMail({
      from: SMTP_FROM,
      to: to.join(', '),
      subject,
      body: text,
      error: error.message,
      date: new Date()
    });
  }
}
