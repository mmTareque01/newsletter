// hooks/useApi.ts
"use client";

import { NewsletterTypes } from "@/apis/apisEndpoint";
import { useAppStore } from "@/stores/app.store";
// import { useRouter } from "next/navigation";
import { useApi } from "../useAPI";
import { useNewsletterTypesStore } from "@/stores/newsletterTypes.store";
import { NewsletterType } from "@/types/newsletter";
import { generateURL } from "@/libs/generateURL";

export function useNewsletter() {
  const { callApi } = useApi();
  const { setNewsletterTypes, setNewsletterPagination } = useNewsletterTypesStore();
  const handleGetNewsletter = async (pageNo: number = 1, pageSize: number = 10) => {
    const newsletterTypes = await callApi(generateURL(NewsletterTypes, {
      pageNo: pageNo,
      pageSize: pageSize
    }), { method: "GET" });
    if (newsletterTypes) {
      // console.log({newsletterTypes})
      setNewsletterTypes(newsletterTypes?.data || []);
      setNewsletterPagination(newsletterTypes?.paginate || {});
    }
  };

  const handleCreateNewsletterType = async (data: NewsletterType) => {
    const newsletterTypes = await callApi(NewsletterTypes, { method: "POST", data: data }, "New type created successfully");
    if (newsletterTypes) {
      // setNewsletterTypes(newsletterTypes?.data || []);
      handleGetNewsletter();
    }
  };

  const handleUpdateNewsletterType = async (id: string, data: NewsletterType) => {
    const newsletterTypes = await callApi(`${NewsletterTypes}/${id}`, { method: "PUT", data }, "Type updated successfully");
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
    handleDeleteNewsletterType,
    handleUpdateNewsletterType
    // handleUpdateSubscriber,
    // handleDeleteSubscriber,
  };
}
