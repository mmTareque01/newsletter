// components/LoadingOverlay.tsx
'use client';

import { useApiStore } from '@/stores/api.store';

export function LoadingOverlay() {
  const { isLoading } = useApiStore();

  if (!isLoading) return null;

  return (
  <div className="fixed inset-0  bg-opacity-10 backdrop-blur-sm flex items-center justify-center z-50">
  <div className="animate-spin rounded-full h-25 w-25 border-y-5 border-blue-600"></div>
</div>

  );
}