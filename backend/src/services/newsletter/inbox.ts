export interface Mail {
  from: string;
  subject: string;
  body: string;
  date: Date;
}

// In-memory array to store emails
export const inbox: Mail[] = [];

// Utility function to add a new email
export function addMail(mail: Mail): void {
  inbox.push(mail);
}
