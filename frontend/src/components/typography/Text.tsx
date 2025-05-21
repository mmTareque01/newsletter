import { Typography } from "@/types/typography";
import React from "react";

export default function Text({ className, children, ...props }: Typography) {
  return (
    <p
      className={`text-lg text-[#343434] ${className || ""}`}
      {...props}
    >
      {children}
    </p>
  );
}
