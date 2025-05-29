// hooks/useApi.ts
"use client";

import { apiClient } from "@/libs/api/service";
import { useApiStore } from "@/stores/api.store";
import { useAppStore } from "@/stores/app.store";
import { APIErrorResponse, ApiRequestOptions } from "@/types/api";
import axios from "axios";
import { toast } from "react-toastify";

export function useApi() {
  const { startLoading, stopLoading, setError, clearError } = useApiStore();
  const { refreshToken, setRefreshToken } = useAppStore();

  const callApi = async <T,>(
    endpoint: string,
    options?: ApiRequestOptions,
    successMessage?: string,
    stopLoader?: boolean
  ): Promise<T | null> => {
    startLoading();
    clearError(endpoint);

    try {
      const response = await apiClient<T>(endpoint, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${refreshToken}`, // optional
        },
        ...options,
      });

      if (response.error) {
        // alert(2)
        setError(endpoint, "response.error");
        return null;
      }

      const newToken =
        response?.headers?.["authorization"] 
        // ||
        // console.log({newToken})
        // response.headers?.["Authorization"];
      if (newToken?.startsWith("Bearer ")) {
        const token = newToken.split(" ")[1];
        setRefreshToken(token); // Update the store
      }

      if (successMessage) {
        toast.success(successMessage);
      }

      //   return response.data;
      return response.data ?? null;
    } catch (error: unknown) {
      let errorMessage = "Something went wrong";

      if (axios.isAxiosError<APIErrorResponse>(error)) {
        errorMessage = error.response?.data?.message || error.message;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      // alert(1);

      setError(endpoint, errorMessage);
      return null;
    } finally {
      if (!stopLoader) stopLoading();
    }
  };

  return { callApi };
}
