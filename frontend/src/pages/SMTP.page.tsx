"use client";

import { useState, FormEvent } from "react";

interface EmailSettingsFormProps {
    onSubmit: (data: {
        smtpHost: string;
        smtpPort: number;
        smtpUser: string;
        smtpPassword: string;
        fromEmail: string;
        fromName?: string;
        useTLS: boolean;
    }) => void;
}

export default function EmailSettingsForm({ onSubmit }: EmailSettingsFormProps) {
    const [smtpHost, setSmtpHost] = useState("");
    const [smtpPort, setSmtpPort] = useState(587);
    const [smtpUser, setSmtpUser] = useState("");
    const [smtpPassword, setSmtpPassword] = useState("");
    const [fromEmail, setFromEmail] = useState("");
    const [fromName, setFromName] = useState("");
    const [useTLS, setUseTLS] = useState(true);
    const [error, setError] = useState("");

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setError("");

        if (!smtpHost || !smtpPort || !smtpUser || !smtpPassword || !fromEmail) {
            setError("Please fill in all required fields.");
            return;
        }

        onSubmit({
            smtpHost,
            smtpPort,
            smtpUser,
            smtpPassword,
            fromEmail,
            fromName: fromName || undefined,
            useTLS,
        });
    };

    return (
        <div className="max-w-md mx-auto bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4 text-center">
                SMTP Email Settings
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* SMTP Host */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        SMTP Host
                    </label>
                    <input
                        type="text"
                        placeholder="smtp.gmail.com"
                        className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700
                       focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                       p-2 text-gray-900 dark:text-gray-100"
                        value={smtpHost}
                        onChange={(e) => setSmtpHost(e.target.value)}
                    />
                </div>

                {/* SMTP Port */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        SMTP Port
                    </label>
                    <input
                        type="number"
                        placeholder="587"
                        className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700
                       focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                       p-2 text-gray-900 dark:text-gray-100"
                        value={smtpPort}
                        onChange={(e) => setSmtpPort(Number(e.target.value))}
                    />
                </div>

                {/* SMTP User */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        SMTP User (Email)
                    </label>
                    <input
                        type="email"
                        placeholder="your.email@gmail.com"
                        className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700
                       focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                       p-2 text-gray-900 dark:text-gray-100"
                        value={smtpUser}
                        onChange={(e) => setSmtpUser(e.target.value)}
                    />
                </div>

                {/* SMTP Password */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        SMTP Password / App Password
                    </label>
                    <input
                        type="password"
                        placeholder="16-character app password"
                        className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700
                       focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                       p-2 text-gray-900 dark:text-gray-100"
                        value={smtpPassword}
                        onChange={(e) => setSmtpPassword(e.target.value)}
                    />
                </div>

                {/* From Email */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        From Email
                    </label>
                    <input
                        type="email"
                        placeholder="from.email@gmail.com"
                        className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700
                       focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                       p-2 text-gray-900 dark:text-gray-100"
                        value={fromEmail}
                        onChange={(e) => setFromEmail(e.target.value)}
                    />
                </div>

                {/* From Name (Optional) */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        From Name (Optional)
                    </label>
                    <input
                        type="text"
                        placeholder="Your Name"
                        className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700
                       focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                       p-2 text-gray-900 dark:text-gray-100"
                        value={fromName}
                        onChange={(e) => setFromName(e.target.value)}
                    />
                </div>

                {/* Use TLS */}
                <div className="flex items-center space-x-2">
                    <input
                        type="checkbox"
                        id="useTLS"
                        checked={useTLS}
                        onChange={(e) => setUseTLS(e.target.checked)}
                        className="w-4 h-4 text-blue-600 bg-gray-200 rounded border-gray-300 focus:ring-2 focus:ring-blue-500"
                    />
                    <label htmlFor="useTLS" className="text-sm text-gray-700 dark:text-gray-300">
                        Use TLS
                    </label>
                </div>

                {/* Error Message */}
                {error && <p className="text-sm text-red-500 font-medium text-center">{error}</p>}

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 
                     rounded-md transition duration-200"
                >
                    Save Settings
                </button>
            </form>
        </div>
    );
}



interface SendGridCredentialsFormProps {
    onSubmit: (data: {
        apiKey: string;
        fromEmail: string;
        fromName?: string;
    }) => void;
}

export function SendGridCredentialsForm({ onSubmit }: SendGridCredentialsFormProps) {
    const [apiKey, setApiKey] = useState("");
    const [fromEmail, setFromEmail] = useState("");
    const [fromName, setFromName] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setError("");

        if (!apiKey || !fromEmail) {
            setError("API Key and From Email are required.");
            return;
        }

        onSubmit({
            apiKey,
            fromEmail,
            fromName: fromName || undefined,
        });
    };

    return (
        <div className="max-w-md mx-auto bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4 text-center">
                SendGrid Credentials
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* API Key */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        SendGrid API Key
                    </label>
                    <input
                        type="password"
                        placeholder="SG.xxxxxxxx"
                        className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700
                       focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                       p-2 text-gray-900 dark:text-gray-100"
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                    />
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                        You can generate an API key in your SendGrid dashboard.
                    </p>
                </div>

                {/* From Email */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        From Email
                    </label>
                    <input
                        type="email"
                        placeholder="from.email@example.com"
                        className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700
                       focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                       p-2 text-gray-900 dark:text-gray-100"
                        value={fromEmail}
                        onChange={(e) => setFromEmail(e.target.value)}
                    />
                </div>

                {/* From Name (Optional) */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        From Name (Optional)
                    </label>
                    <input
                        type="text"
                        placeholder="Your Name"
                        className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700
                       focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                       p-2 text-gray-900 dark:text-gray-100"
                        value={fromName}
                        onChange={(e) => setFromName(e.target.value)}
                    />
                </div>

                {/* Error Message */}
                {error && <p className="text-sm text-red-500 font-medium text-center">{error}</p>}

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 
                     rounded-md transition duration-200"
                >
                    Save Credentials
                </button>
            </form>
        </div>
    );
}
