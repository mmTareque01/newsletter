"use client";
import { mainNavData } from "@/constants/nav";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";



export default function Nav() {
  const pathname = usePathname();

  console.log("Current Pathname:", pathname);

  if (pathname.includes("dashboard")) return null;
  return (
    <header className="fixed inset-x-0 top-0 z-30 mx-auto w-full max-w-screen-md border border-gray-100 bg-white/80  shadow backdrop-blur-lg md:top-6 md:rounded-3xl lg:max-w-screen-lg">
      <div className="px-4">
        <div className="flex items-center justify-between">
          <div className="flex shrink-0">
            <Link aria-current="page" className="flex items-center" href="/">
              <img
                className="h-7 w-auto"
                src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg"
                alt=""
              />
              <p className="sr-only">Website Title</p>
            </Link>
          </div>
          <div className="flex justify-end md:gap-5">
            {mainNavData.map((item, index) => (
              <Link
                key={index} // Don't forget the key prop!
                aria-current="page"
                className="inline-block rounded-lg px-5 py-3 text-large font-medium text-gray-900 
                transition-all duration-200 hover:bg-gray-100 
                hover:scale-105 transform origin-center" // Added transform
                href={item?.path}
              >             {item?.name}
              </Link>
            ))}
          </div>
          <div className="flex items-center justify-end gap-3">
            <Link
              className="hidden items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 transition-all duration-150 hover:bg-gray-50 sm:inline-flex hover:scale-105"
              href="/dashboard"
            >
              Login
            </Link>
            {/* <a
              className="hidden items-center justify-center rounded-xl bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 transition-all duration-150 hover:bg-gray-50 sm:inline-flex"
              href="/login"
            >
              Sign in
            </a>
            <a
              className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              href="/login"
            >
              Login
            </a> */}
          </div>
        </div>
      </div>
    </header>
  );
}
