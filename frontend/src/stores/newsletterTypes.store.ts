import { PaginationParams } from "@/types/pagination";
import { create } from "zustand";

export interface NewsletterType {
  id: string;
  title: string;
  description: string | null;
  key: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  status: string;
}

interface NewsletterTypesState {
  newsletterTypes: NewsletterType[];
  setNewsletterTypes: (types: NewsletterType[]) => void;
  addNewsletterType: (type: NewsletterType) => void;
  removeNewsletterType: (id: string) => void;
  updateNewsletterType: (type: NewsletterType) => void;
  getNewsletterTypeById: (id: string) => NewsletterType | undefined;

  newsletterPagination: PaginationParams;
  setNewsletterPagination: (newsletterPagination: PaginationParams) => void;
}

export const useNewsletterTypesStore = create<NewsletterTypesState>(
  (set, get) => ({
    newsletterTypes: [],
    newsletterPagination: {} as PaginationParams,

    setNewsletterTypes: (types) => set({ newsletterTypes: types }),

    addNewsletterType: (type) =>
      set((state) => ({
        newsletterTypes: [...state.newsletterTypes, type],
      })),

    removeNewsletterType: (id) =>
      set((state) => ({
        newsletterTypes: state.newsletterTypes.filter((type) => type.id !== id),
      })),

    updateNewsletterType: (updatedType) =>
      set((state) => ({
        newsletterTypes: state.newsletterTypes.map((type) =>
          type.id === updatedType.id ? updatedType : type
        ),
      })),

    getNewsletterTypeById: (id) => {
      const state = get();
      return state.newsletterTypes.find((type) => type.id === id);
    },
    setNewsletterPagination: (pagination) => set({ newsletterPagination: pagination }),
  })
);
