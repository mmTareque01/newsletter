import { ApiRequestOptions, ApiResponse } from "@/types/api";
import axiosClient from "./axiosClient";
import axios, { AxiosRequestConfig } from "axios";

export async function apiClient<T>(
  endpoint: string,
  options: ApiRequestOptions = {}
): Promise<ApiResponse<T>> {
  const { method = "GET", headers = {}, data, params, cache } = options;

  const config: AxiosRequestConfig = {
    method,
    url: endpoint,
    headers,
    data,
    params,
    adapter: cache ? undefined : axios.defaults.adapter,
    signal: cache ? undefined : new AbortController().signal,
    withCredentials: true,
  };

  try {
    const response = await axiosClient(config);
      const newToken =
        response?.headers
    console.log({ response: newToken });
    return {
      data: response.data as T,
      error: null,
      status: response.status,
      headers: response.headers as Record<string, string>, // 👈 cast to expected type
    };
  } catch (error: unknown) {
    // return {
    //   data: null,
    //   error: (error?.response?.data )?.message || error.message,
    //   status: error?.response?.status || 500,
    // };

    if (axios.isAxiosError(error)) {
      return {
        data: null,
        error: error.response?.data?.message || error.message,
        status: error.response?.status || 500,
        headers: error.response?.headers as Record<string, string> || {},
      };
    } else {
      return {
        data: null,
        error: "An unknown error occurred",
        status: 500,
        headers: {},
      };
    }
  }
}

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
