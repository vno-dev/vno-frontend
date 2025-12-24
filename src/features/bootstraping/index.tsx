"use client";

import { apiClient } from "@/apis/vno";
import { signOut } from "@/auth";
import { Toaster } from "@/components/ui/sonner";
import { useRouter } from "@/lib/navigation";
import { useAuthStore } from "@/stores/auth";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

const ClientBootstraping = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const { data: user, isError } = useQuery({
    queryKey: ["vno/auth/me"],
    queryFn: () => apiClient.auth.me(),
    retry: false,
    enabled: !!session,
  });

  const { setUser } = useAuthStore();

  useEffect(() => {
    if (!user?.data) return;
    setUser(user?.data);
  }, [setUser, user]);

  useEffect(() => {
    if (isError) {
      signOut({ redirect: false });
      router.replace("/login");
    }
  }, [isError, router]);
  return (
    <>
      <Toaster />
    </>
  );
};

export default ClientBootstraping;
