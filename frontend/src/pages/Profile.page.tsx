'use client'
import PageBreadcrumb from "@/components/PageBreadCrumb";
import { Title } from "@/components/typography";
import UserAddressCard from "@/components/UserAddressCard";
import UserInfoCard from "@/components/UserInfoCard";
import UserMetaCard from "@/components/UserMetaCard";
import PageMeta from "@/others/PageMeta";
import { useAppStore } from "@/stores/app.store";
import { useEffect } from "react";

export default function UserProfiles() {
const { setHeader } = useAppStore();

  useEffect(()=>{
    setHeader(
      <Title>
        Profile
      </Title>
    )
  },[])
  return (
    <>
      <PageMeta
        title="React.js Profile Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js Profile Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
   
        <div className="space-y-6">
          <UserMetaCard />
          <UserInfoCard />
          <UserAddressCard />
        </div>
      </div>
    </>
  );
}
