// stores/api.store.ts
import React from "react";
import { create } from "zustand";

type AppState = {
  refreshToken: string | null;
  setRefreshToken: (token: string) => void;
  header: React.ReactNode;
  setHeader: (node: React.ReactNode) => void;
};

export const useAppStore = create<AppState>((set) => ({
  refreshToken: null,
  header: React.createElement("p"), // Correct JSX element creation
  setRefreshToken: (token: string) => set({ refreshToken: token }),
  setHeader: (node: React.ReactNode) => set({ header: node }),
}));
