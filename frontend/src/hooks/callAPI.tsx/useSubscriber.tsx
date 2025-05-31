// hooks/useApi.ts
"use client";

import { Subscribers } from "@/apis/apisEndpoint";
import { useApi } from "../useAPI";
import { useSubscribersStore } from "@/stores/subscribers.store";
import { SubscriberType } from "@/types/subscribers";
import { generateURL } from "@/libs/generateURL";

export function useSubscribers() {
  const { callApi } = useApi();
  const { setSubscribers, setSubscribersPagination } = useSubscribersStore();


  const handleGetSubscribers = async (pageNo: number = 1, pageSize: number = 10) => {
    const subscribers = await callApi(generateURL(Subscribers, {
      pageNo: pageNo,
      pageSize: pageSize,
    }), { method: "GET" });
    if (subscribers) {
      //   router.push("/signin");
      setSubscribers(subscribers?.data || []);
      setSubscribersPagination(subscribers?.pagination || {});

    }
  };

  const handleUpdateSubscriber = async (id: string, data: SubscriberType) => {
    const subscribers = await callApi(`${Subscribers}/${id}`, { method: "PUT", data });
    if (subscribers) {
      handleGetSubscribers();
    }
  };

  const handleDeleteSubscriber = async (id: string) => {
    const subscribers = await callApi(`${Subscribers}/${id}`, { method: "DELETE" });
    if (subscribers) {
      handleGetSubscribers();
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
