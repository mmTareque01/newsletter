// hooks/useApi.ts
"use client";

import { Login, Logout } from "@/apis/apisEndpoint";
import { SignInFormValues } from "@/constants/auth";
import { apiClient } from "@/libs/api/service";
import { useApiStore } from "@/stores/api.store";
import { useAppStore } from "@/stores/app.store";
import { APIErrorResponse, ApiRequestOptions } from "@/types/api";
import axios from "axios";
import {  useRouter } from "next/navigation";
// import { useRouter } from "next/router";
import { toast } from "react-toastify";

export function useApi() {
  const { startLoading, stopLoading, setError, clearError } = useApiStore();
  const router = useRouter();
  const {  setRefreshToken } = useAppStore();

  const callApi = async <T,>(
    endpoint: string,
    options?: ApiRequestOptions,
    successMessage?: string,
    stopLoader?: boolean
  ): Promise<T | null> => {
    startLoading();
    clearError(endpoint);

    try {
      const response = await apiClient<T>(endpoint, options);

      if (response.error) {
        // alert(2)
        setError(endpoint, "response.error");
        return null;
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

  const handleLogout = async () => {
    const logout = await callApi(Logout, { method: "POST" });
    if (logout) {
      router.push("/signin");
    }
  };

  const handleLogin = async (data: SignInFormValues) => {
    try {
      const authData = await callApi(Login, {
        method: "POST",
        data: data,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (authData) {
        setRefreshToken(authData?.data?.accessToken); //need to resolve it
        // console.log(authData?.data?.accessToken)
        router.push("/dashboard");

        //store access token
        // redirect('/dashboard')
      }
    } catch (error) {
      console.log(error);
    }
  };

  return { callApi, handleLogout, handleLogin };
}
