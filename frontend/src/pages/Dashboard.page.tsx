"use client";
// import DemographicCard from "@/components/dashboard/DemographicCard";
import EcommerceMetrics from "@/components/dashboard/EcommerceMetrics";
import { Title } from "@/components/typography";
// import MonthlySalesChart from "@/components/dashboard/MonthlySalesChart";
// import MonthlyTarget from "@/components/dashboard/MonthlyTarget";
// import RecentOrders from "@/components/dashboard/RecentOrders";
// import StatisticsChart from "@/components/dashboard/StatisticsChart";
import PageMeta from "@/others/PageMeta";
import { useAppStore } from "@/stores/app.store";
import React, { useEffect } from "react";

export default function Dashboard() {
  const { setHeader } = useAppStore();

  useEffect(() => {
    setHeader(<Title>Welcome to Dashboard</Title>);
      },[])
  return (
    <>
      <PageMeta
        title="React.js Ecommerce Dashboard | TailAdmin - React.js Admin Dashboard Template"
        description="This is React.js Ecommerce DashbFoard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 space-y-6 xl:col-span-7">
          <EcommerceMetrics />

          {/* <MonthlySalesChart /> */}
        </div>

        <div className="col-span-12 xl:col-span-5">
          {/* <MonthlyTarget /> */}
        </div>

        <div className="col-span-12">
          {/* <StatisticsChart /> */}
        </div>

        <div className="col-span-12 xl:col-span-5">
          {/* <DemographicCard /> */}
        </div>

        <div className="col-span-12 xl:col-span-7">
          {/* <RecentOrders /> */}
        </div>
      </div>
    </>
  );
}
