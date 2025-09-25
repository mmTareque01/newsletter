export interface NewsletterType {
  id?:string;
  title: string;
  description: string;
  createdAt?: string;
}


export interface Campaign {
  subject:string;
  message: string;
  newsletterTypeId: string;
}

export interface SendMailPayload {
  to: string;
  subject: string;
  body: string;
}
