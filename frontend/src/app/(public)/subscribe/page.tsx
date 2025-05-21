"use client";
import { Text } from "@/components/typography";
import React, { useState } from "react";

// type NewsletterSubscribeProps = {
//   apiUrl?: string;
//   placeholder?: string;
//   buttonText?: string;
//   successMessage?: string;
//   className?: string;
// };

export default function Subscribe() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);
  const [hasSubscribed, setHasSubscribed] = useState(false);

  const apiUrl = "/api/subscribe";
  const placeholder = "Enter your email";
  const buttonText = "Subscribe";
  const successMessage = "Thanks for subscribing!";
  const className = "";

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setMessage({ text: "Please enter a valid email address", type: "error" });
      return;
    }

    setIsLoading(true);
    setMessage(null);

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Subscription failed");
      }

      setMessage({ text: successMessage, type: "success" });
      setEmail("");
      setHasSubscribed(true);
    } catch (error) {
      setMessage({
        text:
          error instanceof Error
            ? error.message
            : "Failed to subscribe. Please try again.",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (hasSubscribed && message?.type === "success") {
    return (
      <div
        className={`fixed inset-0 flex items-center justify-center p-4 ${className}`}
      >
        <div className="p-6 rounded-md bg-green-50 text-green-800 text-center max-w-md">
          <Text className="font-medium text-lg">{message.text}</Text>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center p-4 ${className}`}
    >
      <div className="w-full max-w-md space-y-4">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={placeholder}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-75"
            required
            disabled={isLoading}
            aria-label="Email address"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            aria-busy={isLoading}
          >
            {isLoading ? (
              <span className="inline-flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Processing...
              </span>
            ) : (
              buttonText
            )}
          </button>
        </form>

        {message && (
          <div
            className={`p-4 rounded-lg text-center ${
              message.type === "success"
                ? "bg-green-50 text-green-800"
                : "bg-red-50 text-red-800"
            }`}
            role="alert"
          >
            <Text className="font-medium">{message.text}</Text>
          </div>
        )}

        <Text className="text-xs text-gray-500 text-center">
          We respect your privacy. Unsubscribe at any time.
        </Text>
      </div>
    </div>
  );
}
