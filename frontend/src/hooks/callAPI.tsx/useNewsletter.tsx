// hooks/useApi.ts
"use client";

import { Newsletter } from "@/apis/apisEndpoint";
import { useApi } from "../useAPI";
import { Campaign } from "@/types/newsletter";

export function useNewsletter() {
    const { callApi } = useApi();


    const handleSendNewsletter = async (data: Campaign) => {
        await callApi({
            endpoint: Newsletter,
            options: { method: "POST", data: data },
            successMessage: "Newsletter sent successfully"
        });

    };


    return {
        handleSendNewsletter,
        // handleDeleteSubscriber,
    };
}
