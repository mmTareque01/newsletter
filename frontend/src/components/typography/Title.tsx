import { Typography } from "@/types/typography";
import React from "react";

export default function Title({ className, children }: Typography) {
  return (
    <p className={`text-2xl font-bold text-[#343434] mb-6 ${className || ""}`}>
      {children}
    </p>
  );
}
