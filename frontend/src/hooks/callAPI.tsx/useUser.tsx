
// hooks/useApi.ts
"use client";

import { User as UserEnpoint } from "@/apis/apisEndpoint";
import { useApi } from "../useAPI";
import { User, useUserStore } from "@/stores/user.store";

export function useUser() {
    const { callApi } = useApi();

    const { setUserInfo } = useUserStore()


    const handleGetUserInfo = async () => {
        const user = await callApi({
            endpoint: UserEnpoint,
            options: { method: "GET" },
        }) as { data: User };


        console.log({ user })
        setUserInfo(user.data);
    };

    const handleUpdatetUserInfo = async (data: User) => {
        const user = await callApi({
            endpoint: UserEnpoint,
            options: { method: "PUT", data: data },
        }) as { data: User };


        console.log({ user })
        setUserInfo(user.data);
    };


    return {
        handleGetUserInfo,
        handleUpdatetUserInfo,
    };
}
