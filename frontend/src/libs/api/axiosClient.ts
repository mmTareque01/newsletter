// lib/api/axiosClient.ts
import { APIErrorResponse } from "@/types/api";
import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { toast } from "react-toastify";

const BASE_URL = 'http://localhost:3030/api'// process.env.API_BASE_URL;

const axiosClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// // Request interceptor with proper typing
axiosClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Add auth token if exists
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    const errorMessage =
      (error.response?.data as APIErrorResponse)?.error ||
      error.message ||
      "Something went wrong";

    //   console.log(error?.response?.data?.error)

    if (typeof window !== "undefined") {
        // alert(errorMessage)
      toast.error(errorMessage);
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
