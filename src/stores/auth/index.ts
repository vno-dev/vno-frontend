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
      if (!state.user && typeof updater !== "function") {
        return { user: updater as IUser };
      }

      const patch: Partial<IUser> =
        typeof updater === "function"
          ? updater(state.user ?? ({} as IUser))
          : updater;

      return {
        user: state.user
          ? { ...state.user, ...patch }
          : ({ ...patch } as IUser),
      };
    }),

  setLoading: (v) => set({ loading: v }),
  logout: () => set({ user: null }),
}));
