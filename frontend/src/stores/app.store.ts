// stores/api.store.ts
import { create } from "zustand";

type AppState = {
  refreshToken: string | null;
  setRefreshToken: (token: string) => void;
};

export const useAppStore = create<AppState>((set) => ({
  refreshToken: null,
  setRefreshToken: (token: string) => set({ refreshToken: token }),
}));
