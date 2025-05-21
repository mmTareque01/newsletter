import React, { ReactNode } from "react";

interface WrapperProps {
  children: ReactNode;
  className?: string;
}

export default function Wrapper({ className, children }: WrapperProps) {
  return (
    <main className="min-h-screen items-center justify-center bg-black dark:bg-black py-16 px-4 sm:px-6 lg:px-8">
      <div className={`container justify-center ${className}`}>{children}</div>
    </main>
  );
}
