export interface SubscriberType {
  id?: string;
  status: string;
}

export interface BulkSubscriberType {
  subscribers: File;
  newsletterTypeId: string;
}
