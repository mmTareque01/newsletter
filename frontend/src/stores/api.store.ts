// stores/api.store.ts
import { create } from 'zustand';

type ApiState = {
  isLoading: boolean;
  errors: Record<string, string>;
  startLoading: () => void;
  stopLoading: () => void;
  setError: (key: string, message: string) => void;
  clearError: (key: string) => void;
  reset: () => void;
};

export const useApiStore = create<ApiState>((set) => ({
  isLoading: false,
  errors: {},
  startLoading: () => set({ isLoading: true }),
  stopLoading: () => set({ isLoading: false }),
  setError: (key, message) => set((state) => ({ 
    errors: { ...state.errors, [key]: message } 
  })),
  clearError: (key) => set((state) => {
    const newErrors = { ...state.errors };
    delete newErrors[key];
    return { errors: newErrors };
  }),
  reset: () => set({ isLoading: false, errors: {} }),
}));