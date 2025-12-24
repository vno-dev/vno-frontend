import { IUser } from "@/apis/vno/interfaces/user";
import { Updater } from "@tanstack/react-query";
import { create } from "zustand";

interface AuthState {
  user: IUser | null;
  loading: boolean;
  /**
   * setUser có thể nhận:
   * - function updater (prev: IUser) => Partial<IUser>
   * - object literal Partial<IUser>
   */
  setUser: (updater: Updater<IUser, Partial<IUser>>) => void;
  setLoading: (v: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,

  setUser: (updater) =>
    set((state) => {
      if (!state.user) return { user: null }; // an toàn khi chưa login

      const patch =
        typeof updater === "function" ? updater(state.user) : updater;

      return {
        user: { ...state.user, ...patch }, // merge partial
      };
    }),

  setLoading: (v) => set({ loading: v }),

  logout: () => set({ user: null }),
}));
