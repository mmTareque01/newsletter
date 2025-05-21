// lib/api/service.ts
import { ApiRequestOptions, ApiResponse } from "@/types/api";
import axiosClient from "./axiosClient";
import axios, { AxiosRequestConfig } from "axios";
// import { ApiRequestOptions, ApiResponse } from "./types";

export async function apiClient<T>(
  endpoint: string,
  options: ApiRequestOptions = {}
): Promise<ApiResponse<T>> {
  const { method = 'GET', headers = {}, data, params, cache, revalidate } = options;

  const config: AxiosRequestConfig = {
    method,
    url: endpoint,
    headers,
    data,
    params,
    // Next.js specific cache options
    adapter: cache ? undefined : axios.defaults.adapter,
    signal: cache ? undefined : new AbortController().signal,
  };

  try {
    const response = await axiosClient(config);
    return {
      data: response.data as T,
      error: null,
      status: response.status,
    };
  } catch (error: any) {
    return {
      data: null,
      error: (error.response?.data as any)?.message || error.message,
      status: error.response?.status || 500,
    };
  }
}

// lib/api/server.ts
// import { apiClient } from './service';
// import { ApiRequestOptions } from './types';

export async function serverApiClient<T>(
  endpoint: string,
  options?: ApiRequestOptions
) {
  const response = await apiClient<T>(endpoint, {
    ...options,
    cache: true,
    revalidate: options?.revalidate || 3600,
  });

  if (response.error) {
    throw new Error(response.error);
  }

  return response.data;
}
