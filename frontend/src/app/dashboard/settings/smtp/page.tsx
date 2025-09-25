"use client";

import EmailSettingsForm, { SendGridCredentialsForm } from "@/pages/SMTP.page";
import SMTPCredentialsForm from "@/pages/SMTP.page";

export default function Page() {
    const handleSaveSettings = (data: {
        smtpHost: string;
        smtpPort: number;
        smtpUser: string;
        smtpPassword: string;
        fromEmail: string;
        fromName?: string;
        useTLS: boolean;
    }) => {
        console.log("SMTP Settings:", data);
        // Save settings to backend securely
    };


    const handleSaveSendGrid = (data: { apiKey: string; fromEmail: string; fromName?: string }) => {
        console.log("SendGrid Data:", data);
        // Save data to backend securely
    };

    return (
        <>
            <div className="flex gap-4 space-y-8">
                <EmailSettingsForm onSubmit={handleSaveSettings} />
                <SendGridCredentialsForm onSubmit={handleSaveSendGrid} />
            </div>
        </>
    )

}
