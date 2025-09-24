import { PaginationParams } from "@/types/pagination";
import { create } from "zustand";

export interface User extends Record<string, unknown> {
  email: string;
  firstName: string | null;
  lastName: string | null;
  phone: string | null;
  bio: string | null;
  image: string | null;
  social: {
    facebook?: string;
    x?: string;
    linkedin?: string;
    instagram?: string;
  };
  address: {
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
  }
}
interface UserStates {
  userInfo: User;
  setUserInfo: (subs: User) => void;
  // addSubscriber: (sub: User) => void;
  // removeSubscriber: (id: string) => void;

  // subscribersPagination: PaginationParams;
  // setSubscribersPagination: (subscribersPagination: PaginationParams) => void;
}

export const useUserStore = create<UserStates>((set) => ({
  userInfo: {} as User,

  setUserInfo: (subs) => set({ userInfo: subs }),

  // addSubscriber: (sub) =>
  //   set((state) => ({ subscribers: [...state.subscribers, sub] })),
  // removeSubscriber: (id) =>
  //   set((state) => ({
  //     subscribers: state.subscribers.filter((sub) => sub.id !== id),
  //   })),
  // setSubscribersPagination: (pagination) =>
  //   set({ subscribersPagination: pagination }),
}));
