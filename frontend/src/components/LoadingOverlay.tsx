// components/LoadingOverlay.tsx
'use client';

import { useApiStore } from '@/stores/api.store';

export function LoadingOverlay() {
  const { isLoading } = useApiStore();

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
    </div>
  );
}