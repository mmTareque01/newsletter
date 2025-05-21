import Link from "next/link";
import React from "react";
import { FaLessThan } from "react-icons/fa";

export default function GoBack() {
  return (
    <div className="w-full max-w-md pt-10 mx-auto">
      <Link
        href="/"
        className="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-gray-700 "
      >
        <FaLessThan className="size-5" />
        Back to dashboard
      </Link>
    </div>
  );
}
