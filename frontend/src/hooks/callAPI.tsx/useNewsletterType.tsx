// hooks/useApi.ts
"use client";

import { NewsletterTypes } from "@/apis/apisEndpoint";
import { useAppStore } from "@/stores/app.store";
// import { useRouter } from "next/navigation";
import { useApi } from "../useAPI";
import { useNewsletterTypesStore } from "@/stores/newsletterTypes.store";
import { NewsletterType } from "@/types/newsletter";
import { generateURL } from "@/libs/generateURL";

export function useNewsletterType() {
  const { callApi } = useApi();
  const { setNewsletterTypes, setNewsletterPagination, setAllNewsletterTypes } = useNewsletterTypesStore();

  const handleGetNewsletter = async (pageNo: number = 1, pageSize: number = 10) => {
    const newsletterTypes = await callApi({
      endpoint: generateURL(NewsletterTypes, {
        pageNo: pageNo,
        pageSize: pageSize
      }),
      options: { method: "GET" }
    });
    if (newsletterTypes) {
      // console.log({newsletterTypes})
      setNewsletterTypes(newsletterTypes?.data || []);
      setNewsletterPagination(newsletterTypes?.paginate || {});
    }
  };

  const handleGetAllNewsletterTypes = async () => {
    const newsletterTypes = await callApi({
      endpoint: generateURL(NewsletterTypes, {
        pageNo: 1,
        pageSize: 1000000,
        query: 'id, title'
      }),
      options: { method: "GET" }
    });
    if (newsletterTypes) {
      // console.log({newsletterTypes})
      setAllNewsletterTypes(newsletterTypes?.data || []);
      // setNewsletterPagination(newsletterTypes?.paginate || {});
    }
  };

  const handleCreateNewsletterType = async (data: NewsletterType) => {
    const newsletterTypes = await callApi({
      endpoint: NewsletterTypes,
      options: { method: "POST", data: data }
    });
    if (newsletterTypes) {
      // setNewsletterTypes(newsletterTypes?.data || []);
      handleGetNewsletter();
    }
  };

  const handleUpdateNewsletterType = async (id: string, data: NewsletterType) => {
    const newsletterTypes = await callApi({
      endpoint: `${NewsletterTypes}/${id}`,
      options: { method: "PUT", data },
      successMessage: "Type updated successfully"
    });
    if (newsletterTypes) {
      // setNewsletterTypes(newsletterTypes?.data || []);
      handleGetNewsletter();
    }
  };

  const handleDeleteNewsletterType = async (id: string) => {
    const newsletterTypes = await callApi({
      endpoint: `${NewsletterTypes}/${id}`,
      options: { method: "DELETE" },
      successMessage: "Type deleted successfully"
    });
    if (newsletterTypes) {
      // setNewsletterTypes(newsletterTypes?.data || []);
      handleGetNewsletter();
    }
  };

  return {
    handleGetNewsletter,
    handleCreateNewsletterType,
    handleDeleteNewsletterType,
    handleUpdateNewsletterType,
    handleGetAllNewsletterTypes,
    // handleDeleteSubscriber,
  };
}
