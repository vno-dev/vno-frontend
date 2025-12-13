"use client";

import { signOut } from "next-auth/react";
import { useMutation } from "@tanstack/react-query";

export function useLogout() {
  const mutation = useMutation<void, Error, string | undefined>({
    mutationFn: async (callbackUrl) => {
      await signOut({
        callbackUrl: callbackUrl ?? "/login",
      });
    },
  });

  const logout = async (callbackUrl?: string) => {
    return mutation.mutateAsync(callbackUrl);
  };

  return {
    logout,
    isLoading: mutation.isPending,
    error: mutation.error,
  };
}
