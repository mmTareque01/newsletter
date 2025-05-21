import React from "react";

export default function OrBorder() {
  return (
    <div className="relative py-3 sm:py-5">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-gray-200 "></div>
      </div>
      <div className="relative flex justify-center text-sm">
        <span className="p-2 text-gray-400 bg-white  sm:px-5 sm:py-2">Or</span>
      </div>
    </div>
  );
}
