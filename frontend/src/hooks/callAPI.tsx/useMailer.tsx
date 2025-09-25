// hooks/useApi.ts
"use client";

import { Mailer, Newsletter } from "@/apis/apisEndpoint";
import { useApi } from "../useAPI";
import { Campaign, SendMailPayload } from "@/types/newsletter";

export function useMailer() {
    const { callApi } = useApi();


    const handleSendMail = async (data:SendMailPayload) => {
        await callApi({
            endpoint: Mailer,
            options: { method: "POST", data: data },
            successMessage: "Invitation sent successfully"
        });

    };


    return {
        handleSendMail,
        // handleDeleteSubscriber,
    };
}
