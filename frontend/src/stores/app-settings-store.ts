// stores/app-settings-store.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Theme = 'light' | 'dark' | 'system';
type Language = 'en' | 'es' | 'fr';

type AppSettings = {
  theme: Theme;
  language: Language;
  notificationsEnabled: boolean;
  expandedSidebar: boolean;

  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  setLanguage: (language: Language) => void;
  toggleNotifications: () => void;
  toggleSidebar: () => void;
  resetSettings: () => void;
};

const DEFAULT_SETTINGS = {
  theme: 'system' as Theme,
  language: 'en' as Language,
  notificationsEnabled: true,
  expandedSidebar: true,
};

export const useAppSettings = create<AppSettings>()(
  persist(
    (set, get) => ({
      ...DEFAULT_SETTINGS,

      setTheme: (theme) => set({ theme }),

      toggleTheme: () => {
        const current = get().theme;
        const nextTheme = current === 'light' ? 'dark' : 'light';
        set({ theme: nextTheme });
      },

      setLanguage: (language) => set({ language }),

      toggleNotifications: () =>
        set((state) => ({ notificationsEnabled: !state.notificationsEnabled })),

      toggleSidebar: () =>
        set((state) => ({ expandedSidebar: !state.expandedSidebar })),

      resetSettings: () => set(DEFAULT_SETTINGS),
    }),
    {
      name: 'app-settings',
      partialize: (state) => ({
        theme: state.theme,
        language: state.language,
      }),
    }
  )
);
