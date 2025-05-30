import { NewsletterType } from "./newsletter";
import { SubscriberType } from "./subscribers";

// lib/api/types.ts
export interface ApiResponse<T> {
  data?: T | null;
  error?: string | null;
  status?: number;
  headers?: Record<string, string>;
  // message?: string;
  // errors?: Record<string, string[]>;
}

export interface APIErrorResponse {
  message?: string;
  error?: string;
  errors?: Record<string, string[]>;
}

export interface ApiRequestOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  headers?: Record<string, string>;
  data?: {
    email?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
  } | NewsletterType | SubscriberType;
  params?: {
    pageNumber: number;
    pageSize: number;
    search: string;
  };
  cache?: boolean;
  revalidate?: number;
  credentials?: string;
}
