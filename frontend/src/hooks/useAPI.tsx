// // hooks/useApi.ts
// 'use client';

// import { apiClient } from '@/libs/api/service';
// import { useApiStore } from '@/stores/api.store';
// import { ApiRequestOptions } from '@/types/api';
// import { toast } from 'react-toastify';

// export function useApi() {
//   const { startLoading, stopLoading, setError, clearError } = useApiStore();

//   const callApi = async <T,>(
//     endpoint: string,
//     options?: ApiRequestOptions,
//     successMessage?: string
//   ): Promise<T | null> => {
//     startLoading();
//     clearError(endpoint);

//     try {
//       const response = await apiClient<T>(endpoint, options);

//       if (response.error) {
//         setError(endpoint, response.error);
//         return null;
//       }

//       if (successMessage) {
//         toast.success(successMessage);
//       }

//       return response.data;
//     } catch (error: any) {
//       const errorMessage = error.response?.data?.message || error.message;
//       setError(endpoint, errorMessage);
//       return null;
//     } finally {
//       stopLoading();
//     }
//   };

//   return { callApi };
// }