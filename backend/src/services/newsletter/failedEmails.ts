export interface FailedMail {
  from?: string;
  to: string;
  subject: string;
  body: string;
  error: string;
  date: Date;
}

// In-memory array to store failed emails
export const failedMails: FailedMail[] = [];

// Utility function to add a failed email
export function addFailedMail(mail: FailedMail): void {
  failedMails.push(mail);
}
