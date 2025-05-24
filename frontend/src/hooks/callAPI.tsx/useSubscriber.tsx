// hooks/useApi.ts
"use client";

import { Subscribers } from "@/apis/apisEndpoint";
import { useAppStore } from "@/stores/app.store";
// import { useRouter } from "next/navigation";
import { useApi } from "../useAPI";

export function useSubscribers() {
  const { callApi } = useApi();
  const { refreshToken } = useAppStore();
  //   const router = useRouter();
  //   const { setRefreshToken } = useAppStore();

  const handleGetSubscribers = async () => {
    const subscribers = await callApi(Subscribers, { method: "GET" });
    if (subscribers) {
      //   router.push("/signin");
    }
  };

  const handleUpdateSubscriber = async () => {
    const subscribers = await callApi(Subscribers, { method: "GET" });
    if (subscribers) {
      //   router.push("/signin");
    }
  };

  const handleDeleteSubscriber = async () => {
    const subscribers = await callApi(Subscribers, { method: "GET" });
    if (subscribers) {
      //   router.push("/signin");
    }
  };

  //   const handleLogin = async (data: SignInFormValues) => {
  //     try {
  //       const authData = await callApi(Login, {
  //         method: "POST",
  //         data: data,
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       });

  //       if (authData) {
  //         setRefreshToken(authData?.data?.accessToken); //need to resolve it
  //         // console.log(authData?.data?.accessToken)
  //         router.push("/dashboard");

  //         //store access token
  //         // redirect('/dashboard')
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   const handleRegister = async (data: SignUpFormValues) => {
  //     try {
  //       const authData = await callApi(Register, {
  //         method: "POST",
  //         data: data,
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       });

  //       if (authData) {
  //         setRefreshToken(authData?.data?.accessToken); //need to resolve it
  //         // console.log(authData?.data?.accessToken)
  //         router.push("/dashboard");

  //         //store access token
  //         // redirect('/dashboard')
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  return {
    handleGetSubscribers,
    handleUpdateSubscriber,
    handleDeleteSubscriber,
  };
}
