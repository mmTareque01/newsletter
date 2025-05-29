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
}

export const useNewsletterTypesStore = create<NewsletterTypesState>((set, get) => ({
  newsletterTypes: [],
  
  // Set the entire newsletter types array
  setNewsletterTypes: (types) => set({ newsletterTypes: types }),
  
  // Add a single newsletter type
  addNewsletterType: (type) => 
    set((state) => ({ 
      newsletterTypes: [...state.newsletterTypes, type] 
    })),
  
  // Remove a newsletter type by ID
  removeNewsletterType: (id) => 
    set((state) => ({
      newsletterTypes: state.newsletterTypes.filter((type) => type.id !== id),
    })),
  
  // Update an existing newsletter type
  updateNewsletterType: (updatedType) => 
    set((state) => ({
      newsletterTypes: state.newsletterTypes.map((type) => 
        type.id === updatedType.id ? updatedType : type
      ),
    })),
  
  // Get a single newsletter type by ID (without causing state updates)
  getNewsletterTypeById: (id) => {
    const state = get();
    return state.newsletterTypes.find((type) => type.id === id);
  }
}));