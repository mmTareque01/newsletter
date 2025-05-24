// hooks/useApi.ts
"use client";

import { Login, Logout, Register } from "@/apis/apisEndpoint";
import { SignInFormValues, SignUpFormValues } from "@/constants/auth";
import { useAppStore } from "@/stores/app.store";
import { useRouter } from "next/navigation";
import { useApi } from "../useAPI";

export function useAuthApi() {
  const { callApi } = useApi();
  const router = useRouter();
  const { setRefreshToken } = useAppStore();

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

  const handleRegister = async (data: SignUpFormValues) => {
    try {
      const authData = await callApi(Register, {
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
  return { handleLogout, handleLogin, handleRegister };
}
