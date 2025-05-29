// hooks/useApi.ts
"use client";

import { NewsletterTypes } from "@/apis/apisEndpoint";
import { useAppStore } from "@/stores/app.store";
// import { useRouter } from "next/navigation";
import { useApi } from "../useAPI";
import { useNewsletterTypesStore } from "@/stores/newsletterTypes.store";
import { NewsletterType } from "@/types/newsletter";

export function useNewsletter() {
  const { callApi } = useApi();
  const { setNewsletterTypes } = useNewsletterTypesStore();
  const handleGetNewsletter = async () => {
    const newsletterTypes = await callApi(NewsletterTypes, { method: "GET" });
    if (newsletterTypes) {
      setNewsletterTypes(newsletterTypes?.data || []);
    }
  };

  const handleCreateNewsletterType = async (data: NewsletterType) => {
    const newsletterTypes = await callApi(NewsletterTypes, { method: "POST", data: data }, "New type created successfully");
    if (newsletterTypes) {
      // setNewsletterTypes(newsletterTypes?.data || []);
      handleGetNewsletter();
    }
  };

  const handleDeleteNewsletterType = async (id: string) => {
    const newsletterTypes = await callApi(`${NewsletterTypes}/${id}`, { method: "DELETE" }, "Type deleted successfully");
    if (newsletterTypes) {
      // setNewsletterTypes(newsletterTypes?.data || []);
      handleGetNewsletter();
    }
  };

  return {
    handleGetNewsletter,
    handleCreateNewsletterType,
    handleDeleteNewsletterType
    // handleUpdateSubscriber,
    // handleDeleteSubscriber,
  };
}
