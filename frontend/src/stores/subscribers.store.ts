import {create} from "zustand";

export interface Subscriber {
  id: string;
  email: string;
  name: string | null;
  phone: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  status: string;
  userId: string;
  newsletterTypeId: string;
}

interface SubscribersState {
  subscribers: Subscriber[];
  setSubscribers: (subs: Subscriber[]) => void;
  addSubscriber: (sub: Subscriber) => void;
  removeSubscriber: (id: string) => void;
}

export const useSubscribersStore = create<SubscribersState>((set) => ({
  subscribers: [],
  setSubscribers: (subs) => set({ subscribers: subs }),
  addSubscriber: (sub) => set((state) => ({ subscribers: [...state.subscribers, sub] })),
  removeSubscriber: (id) =>
    set((state) => ({ subscribers: state.subscribers.filter((sub) => sub.id !== id) })),
}));
