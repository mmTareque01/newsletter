// import { ApiRequestOptions, ApiResponse } from "@/types/api";
// import axiosClient from "./axiosClient";
// import axios, { AxiosError, AxiosRequestConfig } from "axios";

// export async function apiClient<T>(
//   endpoint: string,
//   options: ApiRequestOptions = {}
// ): Promise<ApiResponse<T>> {
//   const { method = 'GET', headers = {}, data, params, cache } = options;

//   const config: AxiosRequestConfig = {
//     method,
//     url: endpoint,
//     headers,
//     data,
//     params,
//     adapter: cache ? undefined : axios.defaults.adapter,
//     signal: cache ? undefined : new AbortController().signal,
//   };

//   try {
//     const response = await axiosClient(config);
//     return {
//       data: response.data as T,
//       error: null,
//       status: response.status,
//     };
//   } catch (error:AxiosError) {
//     return {
//       data: null,
//       error: (error?.response?.data )?.message || error.message,
//       status: error?.response?.status || 500,
//     };
//   }
// }


// export async function serverApiClient<T>(
//   endpoint: string,
//   options?: ApiRequestOptions
// ) {
//   const response = await apiClient<T>(endpoint, {
//     ...options,
//     cache: true,
//     revalidate: options?.revalidate || 3600,
//   });

//   if (response.error) {
//     throw new Error(response.error);
//   }

//   return response.data;
// }
