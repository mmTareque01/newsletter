// hooks/useApi.ts
"use client";

import { Subscribers } from "@/apis/apisEndpoint";
import { useApi } from "../useAPI";
import { useSubscribersStore } from "@/stores/subscribers.store";
import { BulkSubscriberType, SubscriberType } from "@/types/subscribers";
import { generateURL } from "@/libs/generateURL";

export function useSubscribers() {
  const { callApi } = useApi();
  const { setSubscribers, setSubscribersPagination } = useSubscribersStore();


  const handleGetSubscribers = async (pageNo: number = 1, pageSize: number = 10, newsletterTypeId: string = '') => {
    const subscribers = await callApi({
      endpoint: generateURL(Subscribers, {
        pageNo: pageNo,
        pageSize: pageSize,
        newsletterTypeId: newsletterTypeId
      }),
      options: { method: "GET" },


    });
    if (subscribers) {
      //   router.push("/signin");
      setSubscribers(subscribers?.data || []);
      setSubscribersPagination(subscribers?.pagination || {});

    }
  };

  const handleCreateBulkSubscriber = async (data: BulkSubscriberType) => {
    const subscribers = await callApi({
      endpoint: `${Subscribers}/bulk`,
      options: { method: "POST", data },
      uploadFile: true,
      successMessage: "Subscribers imported successfully!",
    });
    if (subscribers) {
      handleGetSubscribers();
    }
  };

  const handleUpdateSubscriber = async (id: string, data: SubscriberType) => {
    const subscribers = await callApi({
      endpoint: `${Subscribers}/${id}`,
      options: { method: "PUT", data }
    });
    if (subscribers) {
      handleGetSubscribers();
    }
  };

  const handleDeleteSubscriber = async (id: string) => {
    const subscribers = await callApi({
      endpoint: `${Subscribers}/${id}`,
      options: { method: "DELETE" }
    });
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
    handleCreateBulkSubscriber
  };
}
