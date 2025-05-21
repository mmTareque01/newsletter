// app/dashboard/loading.tsx (used automatically by Next.js App Router)
import LoadingSpinner from "@/components/LoadingSpinner";

export default function Loading() {
  return (
    <div className="h-screen flex items-center justify-center bg-white">
      <LoadingSpinner />
    </div>
  );
}
